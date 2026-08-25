import React, { useState, useEffect } from 'react';
import { 
  Inbox, Search, Filter, Phone, MessageSquare, Mail, 
  Trash2, Eye, CheckCircle2, Clock, MapPin, Box, ArrowRight, User 
} from 'lucide-react';
import { DataService } from '../../services/dataService';
import { CustomerEnquiry, EnquiryStatus } from '../../types';
import { SEOHead } from '../../components/common/SEOHead';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';

export const OwnerEnquiriesPage: React.FC = () => {
  const [enquiries, setEnquiries] = useState<CustomerEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [selectedEnquiry, setSelectedEnquiry] = useState<CustomerEnquiry | null>(null);
  const [statusDraft, setStatusDraft] = useState<EnquiryStatus>('new');
  const [notesDraft, setNotesDraft] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const loadEnquiries = async () => {
    setLoading(true);
    try {
      const data = await DataService.fetchEnquiries();
      setEnquiries(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const openEnquiryModal = (enq: CustomerEnquiry) => {
    setSelectedEnquiry(enq);
    setStatusDraft(enq.status);
    setNotesDraft(enq.notes || '');
  };

  const handleUpdateStatus = async () => {
    if (!selectedEnquiry) return;
    setIsSaving(true);
    try {
      await DataService.updateEnquiryStatus(selectedEnquiry.id, statusDraft, notesDraft);
      await loadEnquiries();
      setSelectedEnquiry(null);
    } catch (e: any) {
      alert(`Failed to update enquiry: ${e.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete enquiry from ${name}?`)) return;
    try {
      await DataService.deleteEnquiry(id);
      await loadEnquiries();
      if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
    } catch (e: any) {
      alert(`Error deleting enquiry: ${e.message}`);
    }
  };

  const filteredEnquiries = enquiries.filter((enq) => {
    if (statusFilter !== 'all' && enq.status !== statusFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        enq.name.toLowerCase().includes(q) ||
        enq.phone.toLowerCase().includes(q) ||
        (enq.company && enq.company.toLowerCase().includes(q)) ||
        (enq.message && enq.message.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <SEOHead title="Customer Enquiries Inbox" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal-200 dark:border-charcoal-800">
        <div>
          <span className="text-xs font-mono font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            Lead Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-950 dark:text-white">
            Customer Enquiries
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 dark:text-charcoal-400 mt-1">
            Review incoming quote requests, container inquiries, and customer contact submissions.
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="p-4 rounded-xl bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between shadow-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search enquiries by name, phone, or requirement..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-200 dark:border-charcoal-700 rounded-lg text-xs sm:text-sm text-charcoal-900 dark:text-white focus:outline-none focus:border-brand-600"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-200 dark:border-charcoal-700 rounded-lg text-xs text-charcoal-700 dark:text-charcoal-300 focus:outline-none focus:border-brand-600"
          >
            <option value="all">All Enquiries ({enquiries.length})</option>
            <option value="new">New ({enquiries.filter((e) => e.status === 'new').length})</option>
            <option value="contacted">Contacted</option>
            <option value="quoted">Quoted</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 rounded-2xl overflow-hidden shadow-sm">
        {filteredEnquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-charcoal-50 dark:bg-charcoal-950/80 border-b border-charcoal-200 dark:border-charcoal-800 text-[11px] font-mono uppercase text-charcoal-500">
                <tr>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Enquiry Type</th>
                  <th className="py-3.5 px-4">Subject / Item</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Received</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-100 dark:divide-charcoal-800">
                {filteredEnquiries.map((enq) => (
                  <tr
                    key={enq.id}
                    className={`hover:bg-charcoal-50 dark:hover:bg-charcoal-850/50 transition-colors ${
                      enq.status === 'new' ? 'bg-brand-50/20 dark:bg-brand-950/20' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-charcoal-950 dark:text-white">
                        {enq.name}
                      </div>
                      <div className="text-[11px] font-mono text-charcoal-500 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-brand-600" />
                        <span>{enq.phone}</span>
                        {enq.company && <span>• {enq.company}</span>}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-300">
                        {enq.type.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-medium text-charcoal-900 dark:text-charcoal-200 max-w-[200px] truncate">
                        {enq.containerTitle || enq.lookingFor || enq.subject || 'General Enquiry'}
                      </div>
                      <div className="text-[11px] text-charcoal-500 truncate max-w-[200px]">
                        {enq.message || enq.intendedUse || 'No additional note'}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase ${
                          enq.status === 'new'
                            ? 'bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-800'
                            : enq.status === 'contacted'
                            ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                            : enq.status === 'quoted'
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                            : 'bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-500'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-charcoal-500 font-mono text-[11px]">
                      {new Date(enq.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEnquiryModal(enq)}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-brand-50 dark:bg-brand-950/50 text-brand-700 dark:text-brand-400 hover:bg-brand-100 dark:hover:bg-brand-900 transition-colors"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(enq.id, enq.name)}
                          className="p-1 rounded text-charcoal-400 hover:text-rose-600 transition-colors"
                          title="Delete enquiry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center text-charcoal-500 text-xs sm:text-sm">
            No customer enquiries match your search or filter.
          </div>
        )}
      </div>

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <Modal
          isOpen={Boolean(selectedEnquiry)}
          onClose={() => setSelectedEnquiry(null)}
          title={`Enquiry: ${selectedEnquiry.name}`}
          subtitle={`Reference: ${selectedEnquiry.id} • ${new Date(selectedEnquiry.createdAt).toLocaleString()}`}
          maxWidth="lg"
        >
          <div className="space-y-6">
            {/* Customer Details Box */}
            <div className="p-4 rounded-xl bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-200 dark:border-charcoal-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-charcoal-500 font-mono">Phone:</span>
                <a href={`tel:${selectedEnquiry.phone}`} className="font-bold text-brand-600 hover:underline">
                  {selectedEnquiry.phone}
                </a>
              </div>
              {selectedEnquiry.email && (
                <div className="flex justify-between">
                  <span className="text-charcoal-500 font-mono">Email:</span>
                  <a href={`mailto:${selectedEnquiry.email}`} className="font-medium text-charcoal-900 dark:text-white">
                    {selectedEnquiry.email}
                  </a>
                </div>
              )}
              {selectedEnquiry.company && (
                <div className="flex justify-between">
                  <span className="text-charcoal-500 font-mono">Company:</span>
                  <span className="font-medium text-charcoal-900 dark:text-white">{selectedEnquiry.company}</span>
                </div>
              )}
              {selectedEnquiry.deliveryLocation && (
                <div className="flex justify-between">
                  <span className="text-charcoal-500 font-mono">Location:</span>
                  <span className="font-medium text-charcoal-900 dark:text-white">{selectedEnquiry.deliveryLocation}</span>
                </div>
              )}
            </div>

            {/* Content / Requirement details */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase text-charcoal-700 dark:text-charcoal-300">
                Requirement Details
              </h4>
              {selectedEnquiry.containerTitle && (
                <div className="text-xs">
                  <span className="text-charcoal-500">Related Container: </span>
                  <strong className="text-charcoal-900 dark:text-white">{selectedEnquiry.containerTitle}</strong>
                </div>
              )}
              {selectedEnquiry.lookingFor && (
                <div className="text-xs">
                  <span className="text-charcoal-500">Looking For: </span>
                  <strong className="text-charcoal-900 dark:text-white">{selectedEnquiry.lookingFor}</strong>
                </div>
              )}
              {selectedEnquiry.containerSize && (
                <div className="text-xs">
                  <span className="text-charcoal-500">Container Size: </span>
                  <span className="font-mono text-charcoal-900 dark:text-white">{selectedEnquiry.containerSize}</span>
                </div>
              )}
              {selectedEnquiry.modifications && selectedEnquiry.modifications.length > 0 && (
                <div className="text-xs space-y-1">
                  <span className="text-charcoal-500 block">Requested Modifications:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedEnquiry.modifications.map((m, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-charcoal-100 dark:bg-charcoal-800 text-[11px]">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-3.5 rounded-xl bg-charcoal-100 dark:bg-charcoal-950 border border-charcoal-200 dark:border-charcoal-800 text-xs text-charcoal-800 dark:text-charcoal-200 whitespace-pre-wrap leading-relaxed">
                {selectedEnquiry.message || selectedEnquiry.intendedUse || 'No additional message provided.'}
              </div>
            </div>

            {/* Quick Actions (Call / WhatsApp Customer) */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={`tel:${selectedEnquiry.phone}`}
                className="py-2 px-3 rounded-lg bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-800 dark:text-white text-xs font-bold text-center flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-brand-600" />
                <span>Call Customer</span>
              </a>
              <a
                href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold text-center flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Customer</span>
              </a>
            </div>

            {/* Owner Management Status & Notes */}
            <div className="space-y-3 pt-4 border-t border-charcoal-200 dark:border-charcoal-800">
              <h4 className="text-xs font-bold uppercase text-charcoal-700 dark:text-charcoal-300">
                Update Lead Status & Internal Notes
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-charcoal-500 block mb-1">Status</label>
                  <select
                    value={statusDraft}
                    onChange={(e) => setStatusDraft(e.target.value as EnquiryStatus)}
                    className="w-full px-3 py-1.5 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-lg text-xs"
                  >
                    <option value="new">New Lead</option>
                    <option value="contacted">Contacted Customer</option>
                    <option value="quoted">Quote Sent</option>
                    <option value="closed">Closed / Finalized</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-charcoal-500 block mb-1">Internal Owner Notes</label>
                <textarea
                  rows={2}
                  value={notesDraft}
                  onChange={(e) => setNotesDraft(e.target.value)}
                  placeholder="e.g. Spoke to client on phone, sent 20ft office quotation via email..."
                  className="w-full px-3 py-1.5 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-lg text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedEnquiry(null)}
                >
                  Close
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  isLoading={isSaving}
                  onClick={handleUpdateStatus}
                >
                  Save Status & Notes
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
