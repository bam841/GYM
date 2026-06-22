"use client";

import { useEffect, useState } from "react";
import { Users, CalendarCheck, TrendingUp, ArrowRight } from "lucide-react";

interface Booking {
  id: string;
  name: string;
  phoneNumber: string;
  sessionType: string;
  cost: number;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      });
  }, []);

  const stats = [
    { name: "Total Bookings", value: bookings.length, icon: CalendarCheck, color: "text-blue-400" },
    { name: "Total Revenue", value: `₱${bookings.reduce((acc, curr) => acc + curr.cost, 0)}`, icon: TrendingUp, color: "text-green-400" },
    { name: "Active Members", value: "0", icon: Users, color: "text-yellow-400" },
  ];

  return (
    <div className="min-h-screen bg-black p-8 pt-24">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-black tracking-tight text-zinc-100 uppercase">Admin <span className="text-yellow-400">Dashboard</span></h1>
            <p className="text-zinc-500 font-semibold text-sm">Manage your gym bookings and memberships</p>
          </div>
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

        {/* Bookings Table */}
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
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-zinc-500 italic">Loading bookings...</td>
                  </tr>
                ) : bookings.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-zinc-500 italic">No bookings found yet.</td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr key={booking.id} className="transition-colors hover:bg-zinc-900/20">
                      <td className="px-6 py-4 font-bold text-zinc-100">{booking.name}</td>
                      <td className="px-6 py-4 text-zinc-400">{booking.phoneNumber}</td>
                      <td className="px-6 py-4">
                        <span className="rounded-md border border-yellow-400/20 bg-yellow-400/5 px-3 py-1 text-[10px] font-extrabold text-yellow-400 uppercase tracking-wider">
                          {booking.sessionType}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono font-bold text-zinc-100">₱{booking.cost}</td>
                      <td className="px-6 py-4 text-xs text-zinc-500">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <button className="flex items-center gap-1 text-[10px] font-black tracking-widest text-yellow-400 hover:text-yellow-500 transition-colors cursor-pointer">
                          PROCESS <ArrowRight className="h-3 w-3" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
