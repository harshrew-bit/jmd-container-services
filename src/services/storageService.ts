import { supabase, isSupabaseConfigured } from '../lib/supabase';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'image/svg+xml'];
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

export interface UploadResult {
  url: string;
  filename: string;
}

export const StorageService = {
  /**
   * Validate file type and size
   */
  validateFile(file: File): { valid: boolean; error?: string } {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return {
        valid: false,
        error: `Invalid file format (${file.type}). Supported formats: JPG, PNG, WebP, SVG.`,
      };
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return {
        valid: false,
        error: `File size exceeds 10MB limit (${(file.size / (1024 * 1024)).toFixed(1)}MB). Please choose a smaller image.`,
      };
    }

    return { valid: true };
  },

  /**
   * Upload an image file to a Supabase bucket
   * @param file The image File object
   * @param bucket 'container-images' | 'project-images' | 'site-media'
   * @param folder Optional subfolder
   */
  async uploadImage(
    file: File,
    bucket: 'container-images' | 'project-images' | 'site-media',
    folder: string = 'uploads'
  ): Promise<UploadResult> {
    const validation = this.validateFile(file);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    // Clean filename and make unique
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const cleanName = file.name
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .toLowerCase();
    const filePath = `${folder}/${timestamp}_${randomStr}_${cleanName}.${ext}`;

    // If Supabase is connected, upload to the actual storage bucket
    if (isSupabaseConfigured()) {
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: file.type,
        });

      if (uploadError) {
        console.error(`[StorageService] Upload failed for bucket "${bucket}":`, uploadError);
        throw new Error(`Failed to upload to storage: ${uploadError.message}`);
      }

      const { data: publicUrlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      return {
        url: publicUrlData.publicUrl,
        filename: file.name,
      };
    }

    // Fallback: Convert to Base64 data URL for local simulated storage
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          url: reader.result as string,
          filename: file.name,
        });
      };
      reader.onerror = () => reject(new Error('Failed to read file for local preview'));
      reader.readAsDataURL(file);
    });
  },

  /**
   * Delete an image from storage
   */
  async deleteImage(url: string, bucket: 'container-images' | 'project-images' | 'site-media'): Promise<boolean> {
    if (!isSupabaseConfigured()) return true;

    try {
      // Extract file path from public URL
      const bucketMarker = `/${bucket}/`;
      const index = url.indexOf(bucketMarker);
      if (index === -1) return false;

      const filePath = decodeURIComponent(url.substring(index + bucketMarker.length));
      const { error } = await supabase.storage.from(bucket).remove([filePath]);
      if (error) {
        console.error('[StorageService] Delete error:', error);
        return false;
      }
      return true;
    } catch (e) {
      console.error('[StorageService] Error during deletion:', e);
      return false;
    }
  },
};
