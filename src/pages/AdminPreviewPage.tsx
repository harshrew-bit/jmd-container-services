import React from 'react';
import { Shield, Lock, Database, Image, Inbox, Key, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/common/Button';

export const AdminPreviewPage: React.FC = () => {
  return (
    <div className="space-y-0">
      <SEOHead
        title="Owner Portal Architectural Foundation"
        description="Architectural foundation for the future JMD Container Services owner administration dashboard."
      />

      <PageHeader
        badge="Future System Architecture"
        title="Owner Portal Foundation"
        subtitle="This placeholder route represents the planned architectural structure for the private business owner dashboard, designed for easy integration with future backend and authentication systems."
        breadcrumbs={[{ label: 'Owner Portal' }]}
        actions={
          <Button
            variant="outline"
            size="sm"
            href="/"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Return to Public Website
          </Button>
        }
      />

      <section className="py-14 sm:py-20 bg-industrial-950 min-h-[60vh]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Architecture Disclaimer Notice */}
          <div className="p-6 sm:p-8 rounded-2xl bg-industrial-900 border border-industrial-700/80 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-safety-400">
              <Shield className="w-6 h-6" />
              <h3 className="text-xl font-bold text-white">
                Architectural Foundation for Version 2
              </h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              In accordance with security best practices, the actual owner management dashboard will be protected by secure session authentication, role-based access control, and direct database persistence.
            </p>
            <div className="p-4 rounded-xl bg-industrial-950 border border-industrial-800 text-xs text-slate-400 font-mono">
              <span className="text-safety-400 font-bold">Data Architecture Status: </span>
              All container listings and portfolio projects are decoupled into modular TypeScript data stores (<code className="text-slate-200">src/data/containers.ts</code>, <code className="text-slate-200">src/data/projects.ts</code>), making backend database connection (e.g. Supabase, Firebase, PostgreSQL API) a drop-in replacement.
            </div>
          </div>

          {/* Planned Owner Modules */}
          <div className="space-y-4">
            <h3 className="text-base font-bold uppercase tracking-wider text-white">
              Planned Business Owner Modules
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Module 1 */}
              <div className="p-6 rounded-2xl bg-industrial-900 border border-industrial-800 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-industrial-950 border border-industrial-700 flex items-center justify-center text-safety-400">
                  <Database className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">1. Container Inventory</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Add new inventory, upload photo sets, edit dimensions, update availability status (Available, Reserved, Sold), or archive listings without code changes.
                </p>
              </div>

              {/* Module 2 */}
              <div className="p-6 rounded-2xl bg-industrial-900 border border-industrial-800 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-industrial-950 border border-industrial-700 flex items-center justify-center text-safety-400">
                  <Image className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">2. Project Showcase</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Publish newly completed site offices, security cabins, and custom builds with Before/After comparison images and modification notes.
                </p>
              </div>

              {/* Module 3 */}
              <div className="p-6 rounded-2xl bg-industrial-900 border border-industrial-800 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-industrial-950 border border-industrial-700 flex items-center justify-center text-safety-400">
                  <Inbox className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">3. Customer Enquiries</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Centralized inbox for reviewing incoming quote requests, container enquiries, and custom solution requirements submitted through the website.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center pt-4">
            <Button
              variant="primary"
              size="md"
              href="/"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Back to Main Website
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
