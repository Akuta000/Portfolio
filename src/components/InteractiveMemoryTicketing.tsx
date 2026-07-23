import React, { useState, useEffect } from 'react';
import { Ticket, Sparkles, CheckCircle2, Clock, RefreshCw, QrCode, Shield, MapPin, Calendar, DollarSign, User } from 'lucide-react';

interface Seat {
  id: string;
  row: string;
  number: number;
  type: 'VIP' | 'Regular' | 'Student';
  price: number;
  status: 'available' | 'reserved' | 'occupied';
}

export const InteractiveMemoryTicketing: React.FC = () => {
  // Generate initial seat layout
  const createInitialSeats = (): Seat[] => {
    const seats: Seat[] = [];
    const rows = ['A', 'B', 'C', 'D', 'E'];
    rows.forEach((row, rIdx) => {
      const type = rIdx === 0 ? 'VIP' : rIdx <= 2 ? 'Regular' : 'Student';
      const price = rIdx === 0 ? 500 : rIdx <= 2 ? 300 : 150;
      for (let num = 1; num <= 8; num++) {
        // Pre-occupy a few seats for realism
        const isOccupied = (rIdx === 0 && (num === 3 || num === 4)) || (rIdx === 2 && num === 6) || (rIdx === 4 && (num === 1 || num === 2));
        seats.push({
          id: `${row}${num}`,
          row,
          number: num,
          type,
          price,
          status: isOccupied ? 'occupied' : 'available',
        });
      }
    });
    return seats;
  };

  const [seats, setSeats] = useState<Seat[]>(createInitialSeats);
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);
  const [attendeeName, setAttendeeName] = useState<string>('Karl David Ocfemia');
  const [email, setEmail] = useState<string>('karl.ocfemia@bicol-u.edu.ph');
  const [reservationToken, setReservationToken] = useState<string | null>(null);
  const [holdSeconds, setHoldSeconds] = useState<number>(600); // 10 min hold
  const [isBooked, setIsBooked] = useState<boolean>(false);

  // Reservation hold countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (selectedSeatIds.length > 0 && !isBooked && holdSeconds > 0) {
      timer = setInterval(() => {
        setHoldSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [selectedSeatIds, isBooked, holdSeconds]);

  const toggleSeat = (id: string) => {
    if (isBooked) return;
    const seat = seats.find((s) => s.id === id);
    if (!seat || seat.status === 'occupied') return;

    if (selectedSeatIds.includes(id)) {
      setSelectedSeatIds(selectedSeatIds.filter((sId) => sId !== id));
    } else {
      setSelectedSeatIds([...selectedSeatIds, id]);
    }
  };

  const selectedSeats = seats.filter((s) => selectedSeatIds.includes(s.id));
  const totalPrice = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  const handleBookTickets = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSeatIds.length === 0) return;

    // Generate unique UUID token
    const token = 'TKT-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-' + Date.now().toString().slice(-4);
    setReservationToken(token);
    setIsBooked(true);

    // Update seat status in memory
    setSeats((prev) =>
      prev.map((s) => (selectedSeatIds.includes(s.id) ? { ...s, status: 'occupied' } : s))
    );
  };

  const handleReset = () => {
    setSeats(createInitialSeats());
    setSelectedSeatIds([]);
    setReservationToken(null);
    setIsBooked(false);
    setHoldSeconds(600);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="bg-[#2B080D] text-[#FAF6F0] p-5 sm:p-7 rounded-xl border-2 border-[#800020] shadow-xl my-4">
      {/* Header */}
      <div className="border-b border-[#800020] pb-4 mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-xs font-mono-code text-[#D4AF37] uppercase font-bold tracking-widest">
              Live System Sandbox • Memory Event Ticketing Engine
            </span>
          </div>
          <h3 className="font-serif-display text-2xl font-bold text-[#FAF6F0] mt-1">
            BU Polangui Literary &amp; Tech Summit 2026
          </h3>
        </div>
        <button
          onClick={handleReset}
          className="text-xs font-mono-code bg-[#800020] hover:bg-[#A3283B] text-[#FAF6F0] px-3 py-1.5 rounded border border-[#D4AF37]/40 flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#D4AF37]" /> Reset Seat Map
        </button>
      </div>

      {/* Event Details Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#800020]/40 p-3 rounded-lg border border-[#800020] text-xs font-sans-ui mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#D4AF37]" />
          <span>Date: Oct 28, 2026 • 2:00 PM</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#D4AF37]" />
          <span>Venue: BUPC Cultural Auditorium</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#D4AF37]" />
          <span>Engine: In-Memory Double-Booking Lock</span>
        </div>
      </div>

      {!isBooked ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Seat Grid Map */}
          <div className="lg:col-span-7 bg-[#1C0508] p-4 rounded-xl border border-[#800020]">
            <div className="text-center mb-4">
              <div className="w-full bg-[#800020]/60 border border-[#D4AF37]/30 text-[#D4AF37] font-mono-code text-[11px] font-bold py-1 rounded tracking-widest uppercase">
                STAGE / MAIN PODIUM
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-4 text-[10px] font-mono-code mb-5">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#FAF6F0] border border-[#E2D7C7]"></span> Available
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#D4AF37] text-[#2B080D]"></span> Selected
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#574B4E]"></span> Occupied
              </span>
            </div>

            {/* Rows */}
            <div className="space-y-2.5">
              {['A', 'B', 'C', 'D', 'E'].map((rowLabel) => {
                const rowSeats = seats.filter((s) => s.row === rowLabel);
                const rowType = rowSeats[0]?.type;
                return (
                  <div key={rowLabel} className="flex items-center justify-center gap-2">
                    <span className="w-8 text-xs font-mono-code font-bold text-[#D4AF37]">
                      {rowLabel} <span className="text-[9px] text-[#E2D7C7]/50 block font-normal">({rowType})</span>
                    </span>
                    <div className="flex items-center gap-1.5">
                      {rowSeats.map((seat) => {
                        const isSelected = selectedSeatIds.includes(seat.id);
                        const isOccupied = seat.status === 'occupied';

                        let btnClass = 'bg-[#FAF6F0] text-[#1C1618] hover:bg-[#D4AF37] hover:text-[#2B080D]';
                        if (isOccupied) btnClass = 'bg-[#423135] text-[#807074] cursor-not-allowed';
                        if (isSelected) btnClass = 'bg-[#D4AF37] text-[#2B080D] ring-2 ring-white font-black';

                        return (
                          <button
                            key={seat.id}
                            onClick={() => toggleSeat(seat.id)}
                            disabled={isOccupied}
                            className={`w-7 h-7 rounded text-[11px] font-mono-code font-bold transition-all flex items-center justify-center cursor-pointer ${btnClass}`}
                            title={`Seat ${seat.id} (${seat.type}) - ₱${seat.price}`}
                          >
                            {seat.number}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Checkout & Reservation Form */}
          <div className="lg:col-span-5 bg-[#1C0508] p-5 rounded-xl border border-[#800020] flex flex-col justify-between">
            <div>
              <h4 className="font-serif-display text-lg font-bold text-[#D4AF37] border-b border-[#800020] pb-2 mb-3">
                Ticket Reservation Summary
              </h4>

              {selectedSeatIds.length > 0 ? (
                <div className="space-y-3 font-sans-ui text-xs text-[#E2D7C7]">
                  <div className="flex justify-between items-center bg-[#2B080D] p-2.5 rounded border border-[#800020]">
                    <span className="font-semibold text-white">Selected Seats:</span>
                    <span className="font-mono-code font-bold text-[#D4AF37]">
                      {selectedSeats.map((s) => s.id).join(', ')}
                    </span>
                  </div>

                  <div className="space-y-1.5 bg-[#2B080D] p-2.5 rounded border border-[#800020]">
                    {selectedSeats.map((s) => (
                      <div key={s.id} className="flex justify-between text-[11px]">
                        <span>Seat {s.id} ({s.type})</span>
                        <span className="font-mono-code">₱{s.price}.00</span>
                      </div>
                    ))}
                    <div className="border-t border-[#800020] pt-1.5 flex justify-between font-bold text-sm text-[#D4AF37]">
                      <span>Total Amount:</span>
                      <span className="font-mono-code">₱{totalPrice}.00</span>
                    </div>
                  </div>

                  {/* Hold Timer */}
                  <div className="flex items-center justify-between text-[11px] bg-[#800020]/40 p-2 rounded text-[#D4AF37]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Seat Lock Countdown:
                    </span>
                    <span className="font-mono-code font-bold">{formatTime(holdSeconds)}</span>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center text-xs font-serif-body italic text-[#E2D7C7]/60">
                  Click available seats on the seating layout to lock ticket hold.
                </div>
              )}

              {/* Passenger Info Form */}
              <form onSubmit={handleBookTickets} className="mt-4 space-y-3">
                <div>
                  <label className="block text-[10px] font-mono-code uppercase text-[#D4AF37] mb-1">
                    Attendee Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={attendeeName}
                    onChange={(e) => setAttendeeName(e.target.value)}
                    className="w-full px-3 py-1.5 bg-[#2B080D] border border-[#800020] rounded text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono-code uppercase text-[#D4AF37] mb-1">
                    Student / Delegate Email:
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-1.5 bg-[#2B080D] border border-[#800020] rounded text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={selectedSeatIds.length === 0}
                  className="w-full mt-2 bg-[#D4AF37] hover:bg-[#F2C94C] text-[#2B080D] font-sans-ui font-black text-xs py-2.5 rounded transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  <CheckCircle2 className="w-4 h-4" /> Issue Electronic Ticket Pass
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        /* Printable Digital Ticket Pass View */
        <div className="bg-[#FAF6F0] text-[#1C1618] p-6 rounded-xl border-2 border-[#D4AF37] shadow-2xl max-w-2xl mx-auto">
          <div className="border-b-2 border-dashed border-[#800020] pb-4 mb-4 flex justify-between items-start">
            <div>
              <span className="bg-[#800020] text-[#D4AF37] text-[10px] font-mono-code font-bold px-2 py-0.5 rounded uppercase">
                OFFICIAL ADMISSION PASS
              </span>
              <h4 className="font-serif-display text-2xl font-black text-[#800020] mt-1">
                BU Polangui Tech &amp; Literary Summit
              </h4>
              <p className="text-xs font-serif-body italic text-[#574B4E]">
                Bicol University Polangui Campus Auditorium
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono-code text-[#574B4E] block">TICKET UUID</span>
              <span className="font-mono-code font-bold text-xs text-[#800020]">{reservationToken}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-sans-ui mb-5 bg-[#F2EBE1] p-3 rounded border border-[#E2D7C7]">
            <div>
              <span className="text-[10px] font-mono-code text-[#574B4E] block uppercase">Attendee</span>
              <span className="font-bold text-[#800020]">{attendeeName}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono-code text-[#574B4E] block uppercase">Seats</span>
              <span className="font-mono-code font-bold text-[#800020]">
                {selectedSeats.map((s) => s.id).join(', ')}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono-code text-[#574B4E] block uppercase">Total Paid</span>
              <span className="font-mono-code font-bold text-[#800020]">₱{totalPrice}.00</span>
            </div>
            <div>
              <span className="text-[10px] font-mono-code text-[#574B4E] block uppercase">Status</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> VERIFIED
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-[#800020]/20">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-[#2B080D] p-1.5 rounded flex items-center justify-center border border-[#800020]">
                <QrCode className="w-12 h-12 text-[#D4AF37]" />
              </div>
              <div className="text-[11px] font-mono-code text-[#574B4E]">
                <p className="font-bold text-[#800020]">Gate Entry Scan Token</p>
                <p>Present at entrance door #2</p>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="bg-[#800020] hover:bg-[#4A0E17] text-[#FAF6F0] font-sans-ui font-bold text-xs px-4 py-2 rounded flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#D4AF37]" /> Book Another Ticket
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
