const { useState, useEffect } = React;

/* =========================
   SUPABASE CONFIG
========================= */
const SUPABASE_URL = "https://jbvyidqjbclilifdhmhc.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpidnlpZHFqYmNsaWxpZmRobWhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2OTIxMjgsImV4cCI6MjA4NTI2ODEyOH0.LV5IUdRtieo8swVMeL0hbfUIhGUpjnvZoz6-DISSQkc";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

/* =========================
   APP ROOT
========================= */
function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    restoreSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function restoreSession() {
    const { data } = await supabase.auth.getSession();
    setUser(data?.session?.user ?? null);
    setLoading(false);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {user ? <Dashboard user={user} /> : <Auth />}
    </div>
  );
}

/* =========================
   AUTH (EMAIL + PASSWORD)
========================= */
function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUp() {
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) setError(error.message);
    setLoading(false);
  }

  async function signIn() {
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setError(error.message);
    setLoading(false);
  }

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
      <h1 className="text-xl font-semibold mb-4 text-center">
        Login / Sign Up
      </h1>

      <input
        className="w-full mb-3 px-3 py-2 border rounded"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full mb-3 px-3 py-2 border rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && (
        <div className="text-red-600 text-sm mb-3">
          {error}
        </div>
      )}

      <button
        onClick={signIn}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded mb-2"
      >
        Login
      </button>

      <button
        onClick={signUp}
        disabled={loading}
        className="w-full border py-2 rounded"
      >
        Sign Up
      </button>
    </div>
  );
}

/* =========================
   DASHBOARD
========================= */
function Dashboard({ user }) {
  async function logout() {
    await supabase.auth.signOut();
  }

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-blue-600 px-4 py-3 text-white font-semibold flex justify-between">
        <span>Chat</span>
        <button onClick={logout} className="text-sm">
          Logout
        </button>
      </div>

      <Chat user={user} />
    </div>
  );
}

/* =========================
   CHAT (REALTIME)
========================= */
function Chat({ user }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMessages();

    const channel = supabase
      .channel("messages-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function loadMessages() {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: true });

    setMessages(data || []);
    setLoading(false);
  }

  async function sendMessage() {
    if (!text.trim()) return;

    await supabase.from("messages").insert({
      user_email: user.email,
      content: text,
    });

    setText("");
  }

  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
        {loading && (
          <div className="text-sm text-gray-400">Loading…</div>
        )}

        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            mine={msg.user_email === user.email}
            email={msg.user_email}
            text={msg.content}
          />
        ))}
      </div>

      <div className="p-3 border-t flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          placeholder="Type a message…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}

/* =========================
   MESSAGE BUBBLE
========================= */
function MessageBubble({ mine, email, text }) {
  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
          mine
            ? "bg-blue-600 text-white"
            : "bg-white border text-gray-800"
        }`}
      >
        {!mine && (
          <div className="text-xs text-gray-500 mb-1">
            {email}
          </div>
        )}
        {text}
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
      Loading...
    </div>
  );
}

/* =========================
   RENDER
========================= */
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
