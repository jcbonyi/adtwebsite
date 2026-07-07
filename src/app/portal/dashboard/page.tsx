import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { FileText, Shield, AlertCircle } from "lucide-react";

export default async function PortalDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/portal/login");
  }

  const { data: policies } = await supabase
    .from("policies")
    .select("*")
    .eq("user_id", user.id)
    .limit(10);

  const { data: claims } = await supabase
    .from("claims")
    .select("*")
    .eq("user_id", user.id)
    .limit(10);

  return (
    <section className="section-padding">
      <div className="container-adt">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome, {user.email}</h1>
            <p className="text-sm text-gray-500">Your insurance dashboard</p>
          </div>
          <form action="/api/auth/signout" method="POST">
            <button type="submit" className="text-sm text-gray-500 hover:text-adt-blue">
              Sign Out
            </button>
          </form>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
              <Shield size={20} className="text-adt-blue" /> Active Policies
            </h2>
            {policies && policies.length > 0 ? (
              <div className="space-y-3">
                {policies.map((policy: { id: string; product: string; policy_number: string; status: string; expiry_date: string }) => (
                  <div key={policy.id} className="rounded-xl border border-gray-300/50 bg-white p-4">
                    <p className="font-semibold">{policy.product}</p>
                    <p className="text-sm text-gray-500">{policy.policy_number}</p>
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className="rounded-full bg-adt-green/10 px-2 py-0.5 text-adt-green">{policy.status}</span>
                      <span className="text-gray-400">Expires {policy.expiry_date}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-400">
                <FileText className="mx-auto mb-2" size={32} />
                <p className="text-sm">No policies yet. Contact your ADT advisor.</p>
              </div>
            )}
          </div>

          <div>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
              <AlertCircle size={20} className="text-gold" /> Claims
            </h2>
            {claims && claims.length > 0 ? (
              <div className="space-y-3">
                {claims.map((claim: { id: string; claim_number: string; status: string; incident_type: string; created_at: string }) => (
                  <div key={claim.id} className="rounded-xl border border-gray-300/50 bg-white p-4">
                    <p className="font-semibold">{claim.claim_number}</p>
                    <p className="text-sm text-gray-500">{claim.incident_type}</p>
                    <span className="mt-2 inline-block rounded-full bg-adt-blue/10 px-2 py-0.5 text-xs text-adt-blue">
                      {claim.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-400">
                <p className="text-sm">No active claims.</p>
                <Link href="/#claims" className="mt-2 inline-block text-sm text-adt-blue hover:underline">
                  Report a claim
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
