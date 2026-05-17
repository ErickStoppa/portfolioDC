"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import type { OrionTab, Period } from "./types/orion.types";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import CommandPalette from "./components/CommandPalette";
import NotificationDrawer from "./components/NotificationDrawer";
import OverviewTab from "./components/OverviewTab";
import FinanceiroTab from "./components/FinanceiroTab";
import TesourariaTab from "./components/TesourariaTab";
import AnalyticsTab from "./components/AnalyticsTab";
import OperacoesTab from "./components/OperacoesTab";
import PessoasTab from "./components/PessoasTab";

export default function OrionApp() {
  const [activeTab, setActiveTab]   = useState<OrionTab>("overview");
  const [period, setPeriod]         = useState<Period>("mes");
  const [cmdOpen, setCmdOpen]       = useState(false);
  const [notifOpen, setNotifOpen]   = useState(false);

  const handleTabChange = useCallback((t: OrionTab) => {
    setActiveTab(t);
    setCmdOpen(false);
  }, []);

  const handleCmdOpen  = useCallback(() => setCmdOpen(true),  []);
  const handleCmdClose = useCallback(() => setCmdOpen(false), []);
  const handleNotifToggle = useCallback(() => setNotifOpen((o) => !o), []);
  const handleNotifClose  = useCallback(() => setNotifOpen(false), []);

  return (
    <div
      className="flex h-full overflow-hidden"
      style={{ backgroundColor: "#080f20", color: "#cbd5e1" }}
    >
      <Sidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onCmdOpen={handleCmdOpen}
      />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar
          activeTab={activeTab}
          period={period}
          onPeriodChange={setPeriod}
          onCmdOpen={handleCmdOpen}
          onNotifOpen={handleNotifToggle}
          unreadCount={2}
        />

        <main className="flex-1 overflow-y-auto">
          {activeTab === "overview"    && <OverviewTab period={period} onTabChange={handleTabChange} />}
          {activeTab === "financeiro"  && <FinanceiroTab />}
          {activeTab === "tesouraria"  && <TesourariaTab />}
          {activeTab === "analytics"   && <AnalyticsTab />}
          {activeTab === "operacoes"   && <OperacoesTab />}
          {activeTab === "pessoas"     && <PessoasTab />}
        </main>
      </div>

      {/* Overlays */}
      <AnimatePresence>
        {cmdOpen && (
          <CommandPalette
            key="cmd"
            onClose={handleCmdClose}
            onNavigate={handleTabChange}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {notifOpen && (
          <NotificationDrawer
            key="notif"
            onClose={handleNotifClose}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
