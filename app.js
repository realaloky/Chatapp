const { useState, useEffect } = React;

/* =========================
   SUPABASE CONFIG
   (SAFE: anon public key)
========================= */
const SUPABASE_URL = "https://jbvyidqjbclilifdhmhc.supabase.co";
const SUPABASE_ANON_KEY ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpidnlpZHFqYmNsaWxpZmRobWhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2OTIxMjgsImV4cCI6MjA4NTI2ODEyOH0.LV5IUdRtieo8swVMeL0hbfUIhGUpjnvZoz6-DISSQkc"
1 visits · 1  ;

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

/* =========================
   APP ROOT
========================= */
function App() {
  const [loading, setLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState("checking");

  useEffect(() => {
    checkSupabaseConnection();
  }, []);

  async function checkSupabaseConnection() {
    try {
      // Lightweight request to verify connectivity
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        setConnectionStatus("error");
      } else {
        setConnectionStatus("connected");
      }
    } catch (err) {
      setConnectionStatus("error");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card status={connectionStatus} />
    </div>
  );
}

/* =========================
   MAIN CARD
========================= */
function Card({ status }) {
  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
      <Header />
      <Body status={status} />
    </div>
  );
}

/* =========================
   HEADER
========================= */
function Header() {
  return (
    <div className="bg-blue-600 px-4 py-3 text-white text-lg font-semibold">
      Chat App
    </div>
  );
}

/* =========================
   BODY
========================= */
function Body({ status }) {
  return (
    <div className="p-4 text-gray-700 space-y-3">
      <StatusRow
        label="React"
        ok={true}
      />
      <StatusRow
        label="Tailwind CSS"
        ok={true}
      />
      <StatusRow
        label="Supabase"
        ok={status === "connected"}
      />

      <div className="pt-4 text-sm text-gray-500">
        Status: <b>{status}</b>
      </div>

      {status === "connected" && (
        <div className="text-green-600 text-sm font-medium">
          ✅ Backend ready
        </div>
      )}

      {status === "error" && (
        <div className="text-red-600 text-sm font-medium">
          ❌ Supabase connection failed
        </div>
      )}
    </div>
  );
}

/* =========================
   STATUS ROW
========================= */
function StatusRow({ label, ok }) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <span className={ok ? "text-green-600" : "text-red-600"}>
        {ok ? "OK" : "FAIL"}
      </span>
    </div>
  );
}

/* =========================
   LOADING
========================= */
function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center text-gray-500">
      Connecting to backend...
    </div>
  );
}

/* =========================
   RENDER
========================= */
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
