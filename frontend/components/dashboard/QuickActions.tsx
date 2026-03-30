import React from "react";
import { 
  ClipboardCheck, 
  MessageSquare, 
  PlusCircle, 
  CreditCard,
  Image as ImageIcon,
  BookOpen
} from "lucide-react";
import { motion } from "framer-motion";

const actions = [
  { name: "Mark Attendance", icon: ClipboardCheck, color: "bg-emerald-500", desc: "Mark current class attendance" },
  { name: "Post Homework", icon: BookOpen, color: "bg-blue-500", desc: "Assign home tasks quickly" },
  { name: "Digital Diary", icon: MessageSquare, color: "bg-amber-500", desc: "Send update to parents" },
  { name: "Collect Fee", icon: CreditCard, color: "bg-purple-500", desc: "Process manual fee entry" },
  { name: "Event Gallery", icon: ImageIcon, color: "bg-pink-500", desc: "Upload recent event photos" },
  { name: "New Admission", icon: PlusCircle, color: "bg-indigo-500", desc: "Enroll new student" },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {actions.map((action, index) => (
        <motion.button
          key={action.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
          className="glass-card p-5 group flex items-start gap-4 text-left transition-all hover:ring-2 hover:ring-primary/20"
        >
          <div className={`${action.color} p-3 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform`}>
            <action.icon size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">{action.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-1">{action.desc}</p>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
