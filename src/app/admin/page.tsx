"use client";

import { useEffect, useState } from "react";
import { Users, CalendarCheck, TrendingUp, ArrowRight, Search } from "lucide-react";

interface Booking {
  id: string;
  name: string;
  phoneNumber: string;
  sessionType: string;
  cost: number;
  status: string;
  createdAt: string;
}

interface ActiveMembership {
  id: string;
  name: string;
  phoneNumber: string;
  membershipType: string;
  startDate: string;
  endDate: string;
}

const formatPlanType = (type: string) => {
  const mapping: Record<string, string> = {
    DAILY_BASIC: "Daily - Basic",
    DAILY_TREADMILL: "Daily - With Treadmill",
    WEEKLY_BASIC: "Weekly - Basic",
    WEEKLY_TREADMILL: "Weekly - With Treadmill",
    MONTHLY_BASIC: "Monthly - Basic",
    MONTHLY_TREADMILL: "Monthly - With Treadmill",
    DAILY: "Daily - Basic",
    WEEKLY: "Weekly - Basic",
    MONTHLY: "Monthly - Basic"
  };
  return mapping[type.toUpperCase()] || type;
};

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeMembers, setActiveMembers] = useState<ActiveMembership[]>([]);
  const [activeTab, setActiveTab] = useState<"bookings" | "members">("bookings");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setIsMounted(true);
    if (sessionStorage.getItem("admin_session")) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setLoading(true);
      Promise.all([
        fetch("/api/bookings").then((res) => res.json()),
        fetch("/api/active-members").then((res) => res.json())
      ])
        .then(([bookingsData, membersData]) => {
          setBookings(bookingsData);
          setActiveMembers(membersData);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error loading admin data:", err);
          setLoading(false);
        });
    }
  }, [isLoggedIn]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Invalid email or password.");
      }

      const session = await res.json();
      sessionStorage.setItem("admin_session", session.access_token);
      sessionStorage.setItem("admin_id", session.user.id);
      setIsLoggedIn(true);
      setError("");
    } catch (err: unknown) {
      const errorObj = err as Error;
      setError(errorObj.message || "Invalid email or password.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_session");
    sessionStorage.removeItem("admin_id");
    setIsLoggedIn(false);
  };

  const [activeModalBooking, setActiveModalBooking] = useState<Booking | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleProcessBooking = (booking: Booking) => {
    setActiveModalBooking(booking);
  };

  const confirmProcessBooking = async (bookingId: string) => {
    const adminId = sessionStorage.getItem("admin_id") || "a0000000-0000-0000-0000-000000000001";
    setProcessing(true);

    try {
      const res = await fetch("/api/bookings/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookingId, adminId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to process booking.");
      }

      // Refresh bookings and active members
      const [updatedBookings, updatedMembers] = await Promise.all([
        fetch("/api/bookings").then((res) => res.json()),
        fetch("/api/active-members").then((res) => res.json())
      ]);
      setBookings(updatedBookings);
      setActiveMembers(updatedMembers);
      setActiveModalBooking(null);
    } catch (err: unknown) {
      const errorObj = err as Error;
      alert(errorObj.message || "An error occurred while processing the booking.");
    } finally {
      setProcessing(false);
    }
  };

  const getMembershipStatusText = (endDateStr: string): { status: "ACTIVE" | "EXPIRED"; text: string } => {
    const now = new Date();
    const endDate = new Date(endDateStr);
    const diffTime = endDate.getTime() - now.getTime();

    if (diffTime <= 0) {
      return { status: "EXPIRED", text: `Expired on ${endDate.toISOString().split('T')[0]}` };
    }

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 1) {
      return { status: "ACTIVE", text: `Ends in ${diffDays} days` };
    }

    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    if (diffHours > 1) {
      return { status: "ACTIVE", text: `Ends in ${diffHours} hours` };
    }

    const diffMins = Math.ceil(diffTime / (1000 * 60));
    return { status: "ACTIVE", text: `Ends in ${diffMins} mins` };
  };

  const filteredBookings = bookings.filter((booking) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      booking.name.toLowerCase().includes(query) ||
      booking.phoneNumber.toLowerCase().includes(query) ||
      booking.sessionType.toLowerCase().includes(query)
    );
  });

  const filteredMembers = activeMembers.filter((member) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      member.name.toLowerCase().includes(query) ||
      member.phoneNumber.toLowerCase().includes(query) ||
      member.membershipType.toLowerCase().includes(query)
    );
  });

  const stats = [
    { name: "Total Bookings", value: bookings.length, icon: CalendarCheck, color: "text-blue-400" },
    { name: "Total Revenue", value: `₱${bookings.filter(b => b.status === "COMPLETED").reduce((acc, curr) => acc + curr.cost, 0)}`, icon: TrendingUp, color: "text-green-400" },
    { name: "Active Members", value: new Set(bookings.filter(b => b.status === "COMPLETED").map(b => b.phoneNumber)).size, icon: Users, color: "text-yellow-400" },
  ];

  if (!isMounted) {
    return <div className="min-h-screen bg-black" />;
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 pt-24">
        <div className="w-full max-w-md bg-zinc-950 border border-zinc-900 rounded-lg p-8 shadow-xl shadow-black/85">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-display font-black text-zinc-100 tracking-tight uppercase">
              Admin <span className="text-yellow-400">Portal</span>
            </h1>
          </div>

          <div className="mb-6 p-4 rounded-lg bg-yellow-400/5 border border-yellow-400/10 flex items-start gap-3">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-yellow-400/10 text-yellow-400 mt-0.5">
              <span className="text-xs font-black">!</span>
            </div>
            <div>
              <p className="text-xs font-black text-yellow-400 uppercase tracking-wider mb-1">Security Warning</p>
              <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                Warning: This page is available for the admin only. If you are the admin, please enter your credentials down below.
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-widest text-zinc-500 mb-2">Email Address</label>
              <input
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border border-zinc-800 bg-black p-4 text-sm text-zinc-100 outline-none transition-all focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20"
                placeholder="Enter admin email address"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-widest text-zinc-500 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-zinc-800 bg-black p-4 text-sm text-zinc-100 outline-none transition-all focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20"
                placeholder="Enter admin password"
                required
              />
            </div>

            {error && (
              <p className="text-xs font-semibold text-red-500 tracking-wide">{error}</p>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-yellow-400 p-4 text-xs font-black tracking-widest text-zinc-950 transition-all hover:bg-yellow-500 hover:scale-[1.02] active:scale-[0.98] cursor-pointer uppercase"
            >
              LOG IN
            </button>
          </form>

          <div className="mt-6 text-center border-t border-zinc-900 pt-4">
            <span className="text-[10px] font-bold text-zinc-600 tracking-wider">
              (Log in using your Supabase admin email credentials)
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-8 pt-24">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex items-center justify-between border-b border-zinc-900 pb-6">
          <div>
            <h1 className="text-3xl font-display font-black tracking-tight text-zinc-100 uppercase">Admin <span className="text-yellow-400">Dashboard</span></h1>
            <p className="text-zinc-500 font-semibold text-sm">Manage your gym bookings and memberships</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2 text-xs font-bold tracking-wider text-zinc-400 transition-all hover:border-red-500/50 hover:text-red-400 hover:scale-105 active:scale-95 cursor-pointer"
          >
            LOG OUT
          </button>
        </header>

        {/* Stats Grid */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          {stats.map((item) => (
            <div key={item.name} className="rounded-lg border border-zinc-900 bg-zinc-950 p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-black border border-zinc-900`}>
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <div>
                  <p className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest">{item.name}</p>
                  <p className="text-3xl font-black text-zinc-100">{item.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tab & Search Controls */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-zinc-900 pb-4">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("bookings")}
              className={`px-4 py-2 text-xs font-black tracking-widest uppercase transition-all border-b-2 cursor-pointer -mb-4.5 ${
                activeTab === "bookings"
                  ? "border-yellow-400 text-yellow-400 bg-yellow-400/5"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Bookings Queue ({bookings.length})
            </button>
            <button
              onClick={() => setActiveTab("members")}
              className={`px-4 py-2 text-xs font-black tracking-widest uppercase transition-all border-b-2 cursor-pointer -mb-4.5 ${
                activeTab === "members"
                  ? "border-yellow-400 text-yellow-400 bg-yellow-400/5"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Active Members ({activeMembers.length})
            </button>
          </div>

          <div className="relative w-full md:max-w-xs">
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-zinc-900 bg-zinc-950 px-4 py-2 pl-9 text-xs text-zinc-100 outline-none transition-all focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/20"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-600">
              <Search className="h-3.5 w-3.5" />
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-[10px] font-black uppercase tracking-wider text-zinc-500 hover:text-zinc-300 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Panels */}
        {activeTab === "bookings" ? (
          /* Bookings Table Panel */
          <div className="rounded-lg border border-zinc-900 bg-zinc-950 overflow-hidden shadow-xl">
            <div className="border-b border-zinc-900 p-6 bg-zinc-950/50">
              <h2 className="text-lg font-display font-bold text-zinc-100">Recent Bookings</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-zinc-900 bg-black text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Contact</th>
                    <th className="px-6 py-4">Session</th>
                    <th className="px-6 py-4">Cost</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900">
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-10 text-center text-zinc-500 italic">Loading bookings...</td>
                    </tr>
                  ) : filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-10 text-center text-zinc-500 italic">
                        {searchQuery ? `No matching bookings found for "${searchQuery}".` : "No bookings found yet."}
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((booking) => (
                      <tr key={booking.id} className="transition-colors hover:bg-zinc-900/20">
                        <td className="px-6 py-4 font-bold text-zinc-100">{booking.name}</td>
                        <td className="px-6 py-4 text-zinc-400">{booking.phoneNumber}</td>
                        <td className="px-6 py-4">
                          <span className="rounded-md border border-yellow-400/20 bg-yellow-400/5 px-3 py-1 text-[10px] font-extrabold text-yellow-400 uppercase tracking-wider">
                            {formatPlanType(booking.sessionType)}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-mono font-bold text-zinc-100">₱{booking.cost}</td>
                        <td className="px-6 py-4">
                          {booking.status === "PENDING" ? (
                            <span className="rounded-md border border-yellow-500/20 bg-yellow-500/5 px-3 py-1 text-[10px] font-extrabold text-yellow-500 uppercase tracking-wider">
                              PENDING
                            </span>
                          ) : (
                            <span className="rounded-md border border-green-500/20 bg-green-500/5 px-3 py-1 text-[10px] font-extrabold text-green-400 uppercase tracking-wider">
                              COMPLETED
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-xs text-zinc-500 font-mono">
                          {new Date(booking.createdAt).toISOString().split('T')[0]}
                        </td>
                        <td className="px-6 py-4">
                          {booking.status === "PENDING" ? (
                            <button
                              onClick={() => handleProcessBooking(booking)}
                              className="flex items-center gap-1 text-[10px] font-black tracking-widest text-yellow-400 hover:text-yellow-500 transition-colors cursor-pointer"
                            >
                              PROCESS <ArrowRight className="h-3 w-3" />
                            </button>
                          ) : (
                            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                              PROCESSED
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Active Members Table Panel */
          <div className="rounded-lg border border-zinc-900 bg-zinc-950 overflow-hidden shadow-xl">
            <div className="border-b border-zinc-900 p-6 bg-zinc-950/50">
              <h2 className="text-lg font-display font-bold text-zinc-100">Current Memberships</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-zinc-900 bg-black text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Contact</th>
                    <th className="px-6 py-4">Plan Type</th>
                    <th className="px-6 py-4">Start Date</th>
                    <th className="px-6 py-4">Expiry Date</th>
                    <th className="px-6 py-4">Access Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-10 text-center text-zinc-500 italic">Loading memberships...</td>
                    </tr>
                  ) : filteredMembers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-10 text-center text-zinc-500 italic">
                        {searchQuery ? `No matching members found for "${searchQuery}".` : "No active members found."}
                      </td>
                    </tr>
                  ) : (
                    filteredMembers.map((member) => {
                      const statusInfo = getMembershipStatusText(member.endDate);
                      return (
                        <tr key={member.id} className="transition-colors hover:bg-zinc-900/20">
                          <td className="px-6 py-4 font-bold text-zinc-100">{member.name}</td>
                          <td className="px-6 py-4 text-zinc-400">{member.phoneNumber}</td>
                          <td className="px-6 py-4">
                            <span className="rounded-md border border-yellow-400/20 bg-yellow-400/5 px-3 py-1 text-[10px] font-extrabold text-yellow-400 uppercase tracking-wider">
                              {formatPlanType(member.membershipType)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs text-zinc-500 font-mono">
                            {new Date(member.startDate).toISOString().split('T')[0]}
                          </td>
                          <td className="px-6 py-4 text-xs text-zinc-500 font-mono">
                            {new Date(member.endDate).toISOString().split('T')[0]}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {statusInfo.status === "ACTIVE" ? (
                                <>
                                  <span className="rounded-md border border-green-500/20 bg-green-500/5 px-3 py-1 text-[10px] font-extrabold text-green-400 uppercase tracking-wider">
                                    ACTIVE
                                  </span>
                                  <span className="text-[11px] font-semibold text-zinc-400 italic">
                                    ({statusInfo.text})
                                  </span>
                                </>
                              ) : (
                                <>
                                  <span className="rounded-md border border-red-500/20 bg-red-500/5 px-3 py-1 text-[10px] font-extrabold text-red-500 uppercase tracking-wider">
                                    EXPIRED
                                  </span>
                                  <span className="text-[11px] font-semibold text-zinc-600 italic">
                                    ({statusInfo.text})
                                  </span>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal Overlay */}
      {activeModalBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-zinc-950 border border-zinc-900 rounded-lg p-6 shadow-2xl shadow-black animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 mb-4 text-yellow-400">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-yellow-400/10">
                <CalendarCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-display font-black uppercase tracking-wider text-zinc-100">Confirm Payment</h3>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Verify before activating</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
                By confirming, you verify that this member has paid the booking fee and can now access the gym:
              </p>
              <div className="rounded-lg bg-zinc-900/50 border border-zinc-900 p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-500">Member</span>
                  <span className="text-xs font-bold text-zinc-100">{activeModalBooking.name}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-500">Session Plan</span>
                  <span className="rounded-md border border-yellow-400/20 bg-yellow-400/5 px-2.5 py-0.5 text-[9px] font-extrabold text-yellow-400 uppercase tracking-wider">
                    {formatPlanType(activeModalBooking.sessionType)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-500">Amount Paid</span>
                  <span className="text-sm font-mono font-black text-yellow-400">₱{activeModalBooking.cost}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-green-400 font-extrabold text-[10px] uppercase tracking-widest bg-green-400/5 border border-green-400/10 p-2.5 rounded-lg justify-center">
                <span>✓ Membership will activate instantly</span>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setActiveModalBooking(null)}
                disabled={processing}
                className="px-4 py-2.5 rounded-lg border border-zinc-800 bg-zinc-950 text-[10px] font-extrabold uppercase tracking-widest text-zinc-400 transition-all hover:bg-zinc-900 hover:text-zinc-200 disabled:opacity-50 cursor-pointer active:scale-95"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => confirmProcessBooking(activeModalBooking.id)}
                disabled={processing}
                className="px-4 py-2.5 rounded-lg bg-yellow-400 text-[10px] font-black uppercase tracking-widest text-zinc-950 transition-all hover:bg-yellow-500 disabled:opacity-50 cursor-pointer active:scale-95 flex items-center gap-1.5"
              >
                {processing ? "Processing..." : "Confirm Payment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
