const { useState, useEffect } = React;

/* =========================
   APP ROOT
========================= */
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate app boot (later: auth check)
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card />
    </div>
  );
}

/* =========================
   MAIN CARD
========================= */
function Card() {
  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
      <Header />
      <Body />
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
function Body() {
  return (
    <div className="p-4 text-gray-700 space-y-2">
      <p>✅ React loaded successfully</p>
      <p>✅ Tailwind CSS working</p>
      <p>✅ Ready for Supabase integration</p>

      <div className="mt-4 text-sm text-gray-500">
        Say <b>next</b> to continue.
      </div>
    </div>
  );
}

/* =========================
   LOADING
========================= */
function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center text-gray-500">
      Loading application...
    </div>
  );
}

/* =========================
   RENDER
========================= */
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
