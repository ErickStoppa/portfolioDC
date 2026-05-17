"use client";

import { useState, useMemo, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { clients, deals } from "@/data/crm";
import type { Client, Deal, TeamMember } from "@/data/crm";
import type {
  CrmTab, ClientFilter, SegmentFilter,
  SortField, SortDir, DashboardPeriod, ReportPeriod,
} from "./types/crm.types";
import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { DashboardTab } from "./components/DashboardTab";
import { ClientsTab } from "./components/ClientsTab";
import { PipelineTab } from "./components/PipelineTab";
import { ReportsTab } from "./components/ReportsTab";
import { TeamTab } from "./components/TeamTab";
import { ClientModal } from "./components/ClientModal";

export function CrmApp() {
  const [activeTab, setActiveTab] = useState<CrmTab>("dashboard");
  const [dashPeriod, setDashPeriod] = useState<DashboardPeriod>("mes");
  const [clientSearch, setClientSearch] = useState("");
  const [clientStatusFilter, setClientStatusFilter] = useState<ClientFilter>("Todos");
  const [clientSegmentFilter, setClientSegmentFilter] = useState<SegmentFilter>("Todos");
  const [clientSort, setClientSort] = useState<{ field: SortField; dir: SortDir }>({ field: "portfolioValue", dir: "desc" });
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [pipelineManagerFilter, setPipelineManagerFilter] = useState("Todos");
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [reportPeriod, setReportPeriod] = useState<ReportPeriod>("mes");
  const [reportChartType, setReportChartType] = useState<"barras" | "linha">("barras");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const filteredClients = useMemo(() => {
    let list = [...clients];
    if (clientStatusFilter !== "Todos") list = list.filter(c => c.status === clientStatusFilter);
    if (clientSegmentFilter !== "Todos") list = list.filter(c => c.segment === clientSegmentFilter);
    if (clientSearch.trim()) {
      const q = clientSearch.toLowerCase();
      list = list.filter(c =>
        [c.name, c.email, c.city, c.accountManager].some(s => s.toLowerCase().includes(q))
      );
    }
    list.sort((a, b) => {
      const mult = clientSort.dir === "asc" ? 1 : -1;
      if (clientSort.field === "name") return mult * a.name.localeCompare(b.name);
      if (clientSort.field === "riskScore") return mult * (a.riskScore.length - b.riskScore.length);
      if (clientSort.field === "lastContact") return mult * a.lastContact.localeCompare(b.lastContact);
      return mult * ((a[clientSort.field] as number) - (b[clientSort.field] as number));
    });
    return list;
  }, [clientSearch, clientStatusFilter, clientSegmentFilter, clientSort]);

  const filteredDeals = useMemo(() => {
    if (pipelineManagerFilter === "Todos") return deals;
    return deals.filter(d => d.accountManager === pipelineManagerFilter);
  }, [pipelineManagerFilter]);

  const handleSort = useCallback((field: SortField) => {
    setClientSort(prev => ({
      field,
      dir: prev.field === field && prev.dir === "desc" ? "asc" : "desc",
    }));
  }, []);

  const handleTabChange = useCallback((tab: CrmTab) => setActiveTab(tab), []);

  return (
    <div className="flex min-h-screen bg-[#070b14] text-[#f1f5f9]">
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar activeTab={activeTab} onTabChange={handleTabChange} />
        <main className="flex-1 overflow-auto">
          {activeTab === "dashboard" && (
            <DashboardTab
              period={dashPeriod}
              onPeriodChange={setDashPeriod}
              onTabChange={handleTabChange}
            />
          )}
          {activeTab === "clientes" && (
            <ClientsTab
              clients={filteredClients}
              totalCount={clients.length}
              search={clientSearch}
              onSearchChange={setClientSearch}
              statusFilter={clientStatusFilter}
              onStatusFilter={setClientStatusFilter}
              segmentFilter={clientSegmentFilter}
              onSegmentFilter={setClientSegmentFilter}
              sort={clientSort}
              onSort={handleSort}
              onSelectClient={setSelectedClient}
            />
          )}
          {activeTab === "pipeline" && (
            <PipelineTab
              deals={filteredDeals}
              managerFilter={pipelineManagerFilter}
              onManagerFilter={setPipelineManagerFilter}
              onSelectDeal={setSelectedDeal}
            />
          )}
          {activeTab === "relatorios" && (
            <ReportsTab
              period={reportPeriod}
              onPeriodChange={setReportPeriod}
              chartType={reportChartType}
              onChartTypeChange={setReportChartType}
            />
          )}
          {activeTab === "equipe" && (
            <TeamTab
              selectedMember={selectedMember}
              onSelectMember={setSelectedMember}
            />
          )}
        </main>
      </div>

      <AnimatePresence>
        {selectedClient && (
          <ClientModal
            key="client-modal"
            client={selectedClient}
            relatedDeals={deals.filter(d => d.clientId === selectedClient.id)}
            onClose={() => setSelectedClient(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
