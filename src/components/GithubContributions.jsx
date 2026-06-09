"use client";
import React, { useState, useEffect, useRef } from "react";
import { Github, Calendar, Layers, RotateCw, Sparkles, HelpCircle } from "lucide-react";

const USERNAME = "parixitsoni";
const TOTAL_DAYS = 140; // 20 weeks

// Generate robust mock data for fallback
const generateMockContributions = () => {
  const contributions = [];
  const today = new Date();
  let totalCount = 0;
  
  for (let i = TOTAL_DAYS - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    
    // Simulate real contributions pattern
    const dayOfWeek = d.getDay();
    let count = 0;
    
    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Weekday
      const rand = Math.random();
      if (rand > 0.8) count = Math.floor(Math.random() * 6) + 4;
      else if (rand > 0.3) count = Math.floor(Math.random() * 3) + 1;
    } else { // Weekend
      if (Math.random() > 0.8) count = Math.floor(Math.random() * 2) + 1;
    }
    
    totalCount += count;
    
    let level = 0;
    if (count > 0 && count <= 2) level = 1;
    else if (count > 2 && count <= 4) level = 2;
    else if (count > 4 && count <= 6) level = 3;
    else if (count > 6) level = 4;
    
    contributions.push({ date: dateStr, count, level });
  }
  
  return {
    total: totalCount,
    contributions
  };
};

export const GithubContributions = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [is3D, setIs3D] = useState(true);
  const [rotation, setRotation] = useState({ x: 55, z: -45 });
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredDay, setHoveredDay] = useState(null);
  
  const dragStart = useRef({ x: 0, y: 0, rotX: 55, rotZ: -45 });
  const containerRef = useRef(null);
  const mockRef = useRef(null);

  // Load contributions
  useEffect(() => {
    mockRef.current = generateMockContributions();
    
    fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}`)
      .then((res) => {
        if (!res.ok) throw new Error("API failed");
        return res.json();
      })
      .then((resData) => {
        if (resData && resData.contributions) {
          const localToday = new Date();
          const tzOffset = localToday.getTimezoneOffset() * 60000;
          const localTodayStr = new Date(localToday - tzOffset).toISOString().split("T")[0];
          
          let todayIdx = resData.contributions.findIndex((c) => c.date === localTodayStr);
          if (todayIdx === -1) {
            const utcTodayStr = new Date().toISOString().split("T")[0];
            todayIdx = resData.contributions.findIndex((c) => c.date === utcTodayStr);
          }
          if (todayIdx === -1) {
            const now = new Date();
            todayIdx = resData.contributions.findIndex((c) => new Date(c.date) > now);
            if (todayIdx !== -1) {
              todayIdx = todayIdx - 1;
            } else {
              todayIdx = resData.contributions.length - 1;
            }
          }
          
          const startIdx = Math.max(0, todayIdx - TOTAL_DAYS + 1);
          const recentConts = resData.contributions.slice(startIdx, todayIdx + 1);
          const total = recentConts.reduce((sum, c) => sum + c.count, 0);
          setData({
            total,
            contributions: recentConts,
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn("GitHub contributions API failed. Using fallback mock data.", err);
        // Fallback to mock data
        setData({
          total: mockRef.current.total,
          contributions: mockRef.current.contributions,
        });
        setLoading(false);
      });
  }, []);

  // Handle Dragging for 3D rotation
  const handleMouseDown = (e) => {
    if (!is3D) return;
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      rotX: rotation.x,
      rotZ: rotation.z
    };
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !is3D) return;
    const deltaX = e.clientX - dragStart.current.x;
    const deltaY = e.clientY - dragStart.current.y;
    
    setRotation({
      x: Math.max(30, Math.min(80, dragStart.current.rotX + deltaY * 0.4)),
      z: dragStart.current.rotZ - deltaX * 0.4
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile devices
  const handleTouchStart = (e) => {
    if (!is3D || e.touches.length === 0) return;
    setIsDragging(true);
    dragStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      rotX: rotation.x,
      rotZ: rotation.z
    };
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !is3D || e.touches.length === 0) return;
    const deltaX = e.touches[0].clientX - dragStart.current.x;
    const deltaY = e.touches[0].clientY - dragStart.current.y;
    
    setRotation({
      x: Math.max(30, Math.min(80, dragStart.current.rotX + deltaY * 0.4)),
      z: dragStart.current.rotZ - deltaX * 0.4
    });
  };

  // Setup document-wide mouse release to prevent dragging stuck
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  const resetRotation = () => {
    setRotation({ x: 55, z: -45 });
  };

  if (loading) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-600 dark:border-sky-400"></div>
        <p className="text-sm font-bold text-slate-500 mt-4 tracking-widest uppercase">Fetching Contributions...</p>
      </div>
    );
  }

  const contributions = data?.contributions || [];
  
  // Group into weeks
  const weeks = [];
  let currentWeek = [];
  contributions.forEach((day, index) => {
    currentWeek.push(day);
    if (currentWeek.length === 7 || index === contributions.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  // Level colors mapper (returns top, front, side color overrides)
  const getLevelColor = (level) => {
    switch (level) {
      case 1:
        return {
          bg: "bg-emerald-200 dark:bg-emerald-950/60",
          top: "rgba(167, 243, 208, 0.95)", // light emerald
          front: "rgba(110, 231, 183, 0.95)",
          side: "rgba(52, 211, 153, 0.95)"
        };
      case 2:
        return {
          bg: "bg-emerald-400 dark:bg-emerald-800",
          top: "rgba(52, 211, 153, 0.95)",
          front: "rgba(16, 185, 129, 0.95)",
          side: "rgba(5, 150, 105, 0.95)"
        };
      case 3:
        return {
          bg: "bg-emerald-600 dark:bg-emerald-600",
          top: "rgba(16, 185, 129, 0.95)",
          front: "rgba(5, 150, 105, 0.95)",
          side: "rgba(4, 120, 87, 0.95)"
        };
      case 4:
        return {
          bg: "bg-emerald-800 dark:bg-emerald-400",
          top: "rgba(5, 150, 105, 0.95)",
          front: "rgba(4, 120, 87, 0.95)",
          side: "rgba(6, 95, 70, 0.95)"
        };
      default:
        return {
          bg: "bg-slate-100 dark:bg-slate-800/40",
          top: "rgba(241, 245, 249, 0.8)",
          front: "rgba(226, 232, 240, 0.8)",
          side: "rgba(203, 213, 225, 0.8)"
        };
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section className="py-16 px-6 relative bg-transparent overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 text-slate-900 dark:text-white tracking-tight">
              Open Source <span className="text-sky-600 dark:text-sky-400">Activity</span>
            </h2>
            <div className="flex items-center justify-center md:justify-start gap-2 text-slate-600 dark:text-slate-400 font-bold uppercase tracking-widest text-[10px]">
              <Github size={14} className="text-sky-500" />
              <span>{data?.total || 0} contributions in the last 140 days</span>
            </div>
          </div>

          {/* Toggle controls */}
          <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800/60 p-1.5 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
            <button
              onClick={() => setIs3D(false)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                !is3D
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-md"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Calendar size={14} />
              2D Grid
            </button>
            <button
              onClick={() => setIs3D(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                is3D
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-md"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Layers size={14} />
              3D Isometric
            </button>

            {is3D && (
              <button
                onClick={resetRotation}
                title="Reset Rotation"
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700/50 transition-all"
              >
                <RotateCw size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Calendar Body */}
        <div className="glass-effect-premium rounded-[2.5rem] md:rounded-[3rem] border border-slate-200 dark:border-white/10 p-8 md:p-12 relative flex flex-col items-center shadow-xl">
          
          {/* Tooltip Overlay */}
          <div className={`absolute top-6 left-6 z-30 transition-all duration-300 pointer-events-none flex items-center gap-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-lg ${hoveredDay ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
            <Sparkles size={14} className="text-amber-500" />
            <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
              {hoveredDay ? (
                <>
                  <span className="text-sky-600 dark:text-sky-400">{hoveredDay.count} commits</span> on {formatDate(hoveredDay.date)}
                </>
              ) : (
                "Hover cubes to view detailed activity"
              )}
            </div>
          </div>

          <div className="w-full overflow-x-auto custom-scrollbar flex justify-center py-8">
            {/* Grid Container */}
            <div 
              ref={containerRef}
              className={`relative select-none ${
                is3D ? "isometric-container min-h-[380px] w-[500px] md:w-[650px] cursor-grab active:cursor-grabbing" : ""
              }`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
            >
              {is3D && (
                <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-20">
                  <div className="text-[10px] font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase flex items-center gap-2">
                    <HelpCircle size={12} /> Drag board to rotate in 3D
                  </div>
                </div>
              )}

              <div 
                className={`flex gap-1 md:gap-1.5 relative z-10 ${is3D ? "isometric-grid" : ""}`}
                style={
                  is3D
                    ? {
                        transform: `rotateX(${rotation.x}deg) rotateZ(${rotation.z}deg)`,
                      }
                    : {}
                }
              >
                {weeks.map((week, wIdx) => {
                  // Hide first 8 weeks on mobile view, to remain fully responsive
                  const isOldWeek = wIdx < 8;
                  return (
                    <div 
                      key={wIdx} 
                      className={`flex-col gap-1 md:gap-1.5 week-col ${isOldWeek ? "hidden sm:flex" : "flex"}`}
                    >
                      {week.map((day) => {
                        const levelColor = getLevelColor(day.level);
                        const blockHeight = is3D ? `${day.level * 10 + 4}px` : "auto";
                        
                        return (
                          <div
                            key={day.date}
                            onMouseEnter={() => setHoveredDay(day)}
                            onMouseLeave={() => setHoveredDay(null)}
                            className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-md transition-all duration-300 relative ${
                              is3D ? "isometric-block cursor-pointer" : `${levelColor.bg} hover:scale-125 hover:shadow-md cursor-pointer`
                            }`}
                            style={is3D ? { "--block-height": blockHeight } : {}}
                          >
                            {/* Render 3D faces if is3D is true */}
                            {is3D && (
                              <>
                                {/* Top Face */}
                                <div 
                                  className="isometric-face isometric-face-top rounded-md border border-white/10 shadow-sm"
                                  style={{ 
                                    backgroundColor: levelColor.top,
                                  }}
                                />
                                {/* Front Face */}
                                <div 
                                  className="isometric-face isometric-face-front rounded-b-md border-x border-b border-black/10"
                                  style={{ 
                                    backgroundColor: levelColor.front,
                                  }}
                                />
                                {/* Side Face */}
                                <div 
                                  className="isometric-face isometric-face-side rounded-b-md border-x border-b border-black/15"
                                  style={{ 
                                    backgroundColor: levelColor.side,
                                  }}
                                />
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Color Legend */}
          <div className="flex items-center gap-2 mt-8 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
            <span>Less</span>
            <div className="w-3 h-3 rounded bg-slate-100 dark:bg-slate-800/40" />
            <div className="w-3 h-3 rounded bg-emerald-200 dark:bg-emerald-950/60" />
            <div className="w-3 h-3 rounded bg-emerald-400 dark:bg-emerald-800" />
            <div className="w-3 h-3 rounded bg-emerald-600 dark:bg-emerald-600" />
            <div className="w-3 h-3 rounded bg-emerald-800 dark:bg-emerald-400" />
            <span>More</span>
          </div>
        </div>
      </div>
    </section>
  );
};
