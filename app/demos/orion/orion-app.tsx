"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  transactions, products, purchaseOrders, employees, orionAlerts,
  activityFeed, monthlyMetrics, kpiSnapshot, revenueSparkline,
  ebitdaSparkline, cashSparkline, stockAlerts, plLines,
  bankAccounts, cashFlowItems, fxRates, budgetLines, suppliers,
} from "@/data/orion";
import type { OrionTab, TxFilter, StockFilter, PoFilter, RhFilter, PlFilter } from "./types/orion.types";
import type { PurchaseOrder } from "@/data/orion";
import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { CommandPalette } from "./components/CommandPalette";
import { NotificationDrawer } from "./components/NotificationDrawer";
import { OverviewTab } from "./components/OverviewTab";
import FinanceiroTab from "./components/FinanceiroTab";
import TesourariaTab from "./components/TesourariaTab";
import AnalyticsTab from "./components/AnalyticsTab";
import OperacoesTab from "./components/OperacoesTab";
import PessoasTab from "./components/PessoasTab";

export function OrionApp() {
  const [activeTab,         setActiveTab]         = useState<OrionTab>("overview");
  const [commandOpen,       setCommandOpen]       = useState(false);
  const [notifOpen,         setNotifOpen]         = useState(false);
  const [sidebarCollapsed,  setSidebarCollapsed]  = useState(false);
  const [resolvedAlerts,    setResolvedAlerts]    = useState<string[]>([]);
  const [txFilter,          setTxFilter]          = useState<TxFilter>("todos");
  const [plFilter,          setPlFilter]          = useState<PlFilter>("mensal");
  const [plMonth,           setPlMonth]           = useState(4);
  const [stockFilter,       setStockFilter]       = useState<StockFilter>("todos");
  const [stockSearch,       setStockSearch]       = useState("");
  const [poFilter,          setPoFilter]          = useState<PoFilter>("todos");
  const [poSearch,          setPoSearch]          = useState("");
  const [rhFilter,          setRhFilter]          = useState<RhFilter>("todos");
  const [rhSearch,          setRhSearch]          = useState("");
  const [pos,               setPos]               = useState<PurchaseOrder[]>(purchaseOrders);
  const [selectedBankId,    setSelectedBankId]    = useState<string | null>(null);

  const activeAlerts      = useMemo(() => orionAlerts.filter(a => !resolvedAlerts.includes(a.id)), [resolvedAlerts]);
  const activeAlertsCount = useMemo(() => activeAlerts.filter(a => !a.resolved).length, [activeAlerts]);
  const stockCriticalCount = stockAlerts.length;

  const filteredTx = useMemo(() => {
    if (txFilter === "todos")   return transactions;
    if (txFilter === "receita") return transactions.filter(t => t.type === "receita");
    if (txFilter === "despesa") return transactions.filter(t => t.type === "despesa");
    return transactions.filter(t => t.status === txFilter);
  }, [txFilter]);

  const filteredStock = useMemo(() => {
    let list = products;
    if (stockFilter === "critico") list = list.filter(p => p.stock <= p.minStock);
    else if (stockFilter !== "todos") list = list.filter(p => p.category === stockFilter);
    if (stockSearch) { const q = stockSearch.toLowerCase(); list = list.filter(p => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)); }
    return list;
  }, [stockFilter, stockSearch]);

  const filteredPOs = useMemo(() => {
    let list = pos;
    if (poFilter === "urgente") list = list.filter(p => p.priority === "urgente" || p.priority === "critica");
    else if (poFilter !== "todos") list = list.filter(p => p.status === poFilter);
    if (poSearch) { const q = poSearch.toLowerCase(); list = list.filter(p => p.supplierName.toLowerCase().includes(q) || p.id.toLowerCase().includes(q)); }
    return list;
  }, [pos, poFilter, poSearch]);

  const filteredEmployees = useMemo(() => {
    let list = employees;
    if (rhFilter !== "todos") list = list.filter(e => e.dept === rhFilter);
    if (rhSearch) { const q = rhSearch.toLowerCase(); list = list.filter(e => e.name.toLowerCase().includes(q) || e.role.toLowerCase().includes(q)); }
    return list;
  }, [rhFilter, rhSearch]);

  const handleResolveAlert = useCallback((id: string) => setResolvedAlerts(p => [...p, id]), []);
  const handleApproveOrder = useCallback((id: string) => {
    setPos(prev => prev.map(p => p.id === id && p.status === "aguardando_aprovacao" ? { ...p, status: "aprovada" } : p));
  }, []);
  const handleTabChange = useCallback((tab: OrionTab) => { setActiveTab(tab); setCommandOpen(false); }, []);
  return (
    <div className="flex h-full overflow-hidden" style={{ backgroundColor: "#030711" }}>
      <Sidebar collapsed={sidebarCollapsed} activeTab={activeTab} onTabChange={handleTabChange}
        onToggle={() => setSidebarCollapsed(c => !c)} activeAlertsCount={activeAlertsCount} stockCriticalCount={stockCriticalCount} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar activeTab={activeTab} onCommandOpen={() => setCommandOpen(true)}
          onNotifOpen={() => setNotifOpen(o => !o)} alertCount={activeAlertsCount}
          onTabChange={handleTabChange} />

        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
              exit={{ opacity:0, y:-8 }} transition={{ duration: 0.15 }} className="h-full">

              {activeTab === "overview" && (
                <OverviewTab revenueSparkline={revenueSparkline} ebitdaSparkline={ebitdaSparkline}
                  cashSparkline={cashSparkline} activeAlerts={activeAlerts} stockAlerts={stockAlerts}
                  activities={activityFeed} monthlyMetrics={monthlyMetrics}
                  revenueMonth={kpiSnapshot.revenueMonth} revenuePrev={kpiSnapshot.revenuePrev}
                  ebitdaMonth={kpiSnapshot.ebitdaMonth} ebitdaMarginPct={kpiSnapshot.ebitdaMarginPct}
                  cashPosition={kpiSnapshot.cashPosition} cashChange7d={kpiSnapshot.cashChange7d}
                  headcountActive={kpiSnapshot.headcountActive}
                  onNavigate={handleTabChange} onNotifOpen={() => setNotifOpen(true)} onResolve={handleResolveAlert} />
              )}
              {activeTab === "financeiro" && (
                <FinanceiroTab transactions={filteredTx} allTransactions={transactions}
                  txFilter={txFilter} onTxFilterChange={setTxFilter}
                  plLines={plLines} plFilter={plFilter} plMonth={plMonth}
                  onPlFilterChange={setPlFilter} onPlMonthChange={setPlMonth} />
              )}
              {activeTab === "tesouraria" && (
                <TesourariaTab bankAccounts={bankAccounts} cashFlowItems={cashFlowItems}
                  fxRates={fxRates} selectedBankId={selectedBankId} onSelectBank={setSelectedBankId} />
              )}
              {activeTab === "analytics" && (
                <AnalyticsTab monthlyMetrics={monthlyMetrics} budgetLines={budgetLines} transactions={transactions} />
              )}
              {activeTab === "operacoes" && (
                <OperacoesTab
                  products={filteredStock} allProducts={products}
                  stockFilter={stockFilter} stockSearch={stockSearch}
                  onStockFilterChange={setStockFilter} onStockSearchChange={setStockSearch}
                  purchaseOrders={filteredPOs} allOrders={pos} suppliers={suppliers}
                  poFilter={poFilter} poSearch={poSearch}
                  onPoFilterChange={setPoFilter} onPoSearchChange={setPoSearch}
                  onApproveOrder={handleApproveOrder} />
              )}
              {activeTab === "pessoas" && (
                <PessoasTab employees={filteredEmployees} allEmployees={employees}
                  rhFilter={rhFilter} rhSearch={rhSearch}
                  onRhFilterChange={setRhFilter} onRhSearchChange={setRhSearch} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <AnimatePresence>{commandOpen && <CommandPalette key="cmd" onClose={() => setCommandOpen(false)} onNav={handleTabChange} />}</AnimatePresence>
      <AnimatePresence>{notifOpen && <NotificationDrawer key="notif" alerts={activeAlerts} onClose={() => setNotifOpen(false)} onResolve={handleResolveAlert} />}</AnimatePresence>
    </div>
  );
}
