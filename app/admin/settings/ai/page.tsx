import Link from "next/link";
import { ChevronRight, Bot, Activity, Cpu, Zap, BarChart3 } from "lucide-react";
import Navbar from "@/features/home/components/Navbar";
import Footer from "@/features/home/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AiSettingsForm from "@/features/ai/components/AiSettingsForm";
import {
  getAiSettingsAction,
  getAITokenStatsAction,
} from "@/features/ai/actions/aiActions";

export const dynamic = "force-dynamic";

export default async function AiSettingsPage() {
  const [settingsResult, statsResult] = await Promise.all([
    getAiSettingsAction(),
    getAITokenStatsAction(),
  ]);

  const settings = settingsResult?.success ? settingsResult.data : null;
  const stats = statsResult?.success ? statsResult.data : null;

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8 space-y-6 max-w-5xl">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground border-b pb-3">
          <Link href="/admin/dashboard" className="hover:text-primary transition-colors">
            Dashboard Admin
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-foreground">Impostazioni AI</span>
        </nav>

        <div className="border-b pb-4">
          <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
            <Bot className="h-8 w-8 text-primary" />
            Configurazione Modelli & Valutazione IA
          </h1>
          <p className="text-muted-foreground mt-1">
            Gestisci il provider, i modelli LLM, i parametri di generazione e monitora il consumo reale dei token.
          </p>
        </div>

        {/* Widget Statistiche Consumo Token */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Correzioni Eseguite</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalReviews ?? 0}</div>
              <p className="text-xs text-muted-foreground mt-1">Valutazioni salvate a sistema</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Token Totali</CardTitle>
              <Zap className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(stats?.totalTokens ?? 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Input + Output</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Token Prompt (Input)</CardTitle>
              <Cpu className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(stats?.totalPromptTokens ?? 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Domande e contesti inviati</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Token Completion (Output)</CardTitle>
              <BarChart3 className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(stats?.totalCompletionTokens ?? 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Risposte e feedback generati</p>
            </CardContent>
          </Card>
        </div>

        {/* Componente Client Form */}
        <AiSettingsForm initialSettings={settings} />
      </main>
      <Footer />
    </>
  );
}