import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Database, Box, Inbox, Plus, ArrowRight, Clock, 
  CheckCircle2, RefreshCw, AlertCircle, Settings, Image 
} from 'lucide-react';
import { DataService } from '../../services/dataService';
import { ContainerItem, ProjectItem, CustomerEnquiry, OwnerDashboardStats } from '../../types';
import { SEOHead } from '../../components/common/SEOHead';
import { StatusBadge } from '../../components/common/Badge';

export const OwnerOverviewPage: React.FC = () => {
  const [stats, setStats] = useState<OwnerDashboardStats | null>(null);
  const [recentContainers, setRecentContainers] = useState<ContainerItem[]>([]);
  const [recentEnquiries, setRecentEnquiries] = useState<CustomerEnquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsData, containers, enquiries] = await Promise.all([
        DataService.fetchDashboardStats(),
        DataService.fetchContainers(),
        DataService.fetchEnquiries(),
      ]);
      setStats(statsData);
      setRecentContainers(containers.slice(0, 4));
      setRecentEnquiries(enquiries.slice(0, 4));
    } catch (e) {
      console.error('Failed to load dashboard overview data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-8">
      <SEOHead title="Owner Dashboard Overview" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal-200 dark:border-charcoal-800">
        <div>
          <span className="text-xs font-mono font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            Management Hub
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-950 dark:text-white">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 dark:text-charcoal-400 mt-1">
            Manage your available container inventory, portfolio projects, media, and customer leads.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-300 hover:bg-charcoal-200 dark:hover:bg-charcoal-700 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <Link
            to="/owner/containers"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-brand-700 hover:bg-brand-600 text-white shadow-md shadow-brand-700/20 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Container</span>
          </Link>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Available Containers */}
        <div className="p-5 rounded-2xl bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-charcoal-500">Available Stock</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-charcoal-950 dark:text-white">
            {stats ? stats.activeContainersCount : '—'}
          </div>
          <div className="text-xs text-charcoal-500 dark:text-charcoal-400 flex items-center justify-between pt-1 border-t border-charcoal-100 dark:border-charcoal-800">
            <span>Total Listed: {stats?.totalContainersCount ?? '—'}</span>
            <Link to="/owner/containers" className="text-brand-600 dark:text-brand-400 hover:underline font-semibold">
              Manage &rarr;
            </Link>
          </div>
        </div>

        {/* Card 2: Showcase Projects */}
        <div className="p-5 rounded-2xl bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-charcoal-500">Our Work</span>
            <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center">
              <Box className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-charcoal-950 dark:text-white">
            {stats ? stats.projectsCount : '—'}
          </div>
          <div className="text-xs text-charcoal-500 dark:text-charcoal-400 flex items-center justify-between pt-1 border-t border-charcoal-100 dark:border-charcoal-800">
            <span>Published Projects</span>
            <Link to="/owner/projects" className="text-brand-600 dark:text-brand-400 hover:underline font-semibold">
              Manage &rarr;
            </Link>
          </div>
        </div>

        {/* Card 3: New Enquiries */}
        <div className="p-5 rounded-2xl bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-charcoal-500">New Leads</span>
            <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-charcoal-950 dark:text-white">
            {stats ? stats.newEnquiriesCount : '—'}
          </div>
          <div className="text-xs text-charcoal-500 dark:text-charcoal-400 flex items-center justify-between pt-1 border-t border-charcoal-100 dark:border-charcoal-800">
            <span>Total Received: {stats?.totalEnquiriesCount ?? '—'}</span>
            <Link to="/owner/enquiries" className="text-brand-600 dark:text-brand-400 hover:underline font-semibold">
              View All &rarr;
            </Link>
          </div>
        </div>

        {/* Card 4: Quick Action Hub */}
        <div className="p-5 rounded-2xl bg-brand-700 text-white shadow-md shadow-brand-700/20 flex flex-col justify-between space-y-3">
          <div>
            <span className="text-xs font-mono font-bold uppercase text-brand-200">Quick Actions</span>
            <h3 className="text-lg font-bold mt-1">Publish & Update</h3>
          </div>
          <div className="space-y-1.5 pt-1">
            <Link
              to="/owner/containers"
              className="block w-full py-1.5 px-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold transition-colors text-center"
            >
              + Add Container Listing
            </Link>
            <Link
              to="/owner/projects"
              className="block w-full py-1.5 px-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold transition-colors text-center"
            >
              + Add Portfolio Project
            </Link>
          </div>
        </div>
      </div>

      {/* Two-Column Grid: Recent Containers & Recent Enquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Containers */}
        <div className="p-6 rounded-2xl bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-charcoal-950 dark:text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              Recent Inventory
            </h2>
            <Link
              to="/owner/containers"
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-charcoal-100 dark:divide-charcoal-800">
            {recentContainers.map((c) => (
              <div key={c.id} className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={c.primaryImage}
                    alt={c.title}
                    className="w-12 h-12 rounded-lg object-cover bg-charcoal-200 dark:bg-charcoal-800 flex-shrink-0"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-charcoal-950 dark:text-white truncate max-w-[180px] sm:max-w-xs">
                      {c.title}
                    </h4>
                    <span className="text-[11px] font-mono text-charcoal-500">
                      {c.id} • {c.size}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <StatusBadge status={c.status} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Enquiries */}
        <div className="p-6 rounded-2xl bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-charcoal-950 dark:text-white flex items-center gap-2">
              <Inbox className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              Latest Customer Leads
            </h2>
            <Link
              to="/owner/enquiries"
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
            >
              <span>Inbox ({stats?.totalEnquiriesCount || 0})</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {recentEnquiries.length > 0 ? (
            <div className="divide-y divide-charcoal-100 dark:divide-charcoal-800">
              {recentEnquiries.map((enq) => (
                <div key={enq.id} className="py-3 flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-xs font-bold text-charcoal-950 dark:text-white">
                        {enq.name}
                      </strong>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-600 dark:text-charcoal-400 uppercase">
                        {enq.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-charcoal-500 truncate max-w-[200px] sm:max-w-xs mt-0.5">
                      {enq.phone} • {enq.containerTitle || enq.lookingFor || enq.subject || 'Enquiry'}
                    </p>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                      enq.status === 'new'
                        ? 'bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300'
                        : 'bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-500'
                    }`}
                  >
                    {enq.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-charcoal-400">
              No online enquiries recorded yet. Forms and WhatsApp actions on the public website will appear here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
