import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "../components/ui/button"
import { ScrollArea } from "../components/ui/scroll-area"
import { Link } from "react-router-dom"

function timeAgo(date: any) {
  const now = new Date();
  const past = new Date(date); // @ts-ignore
  const diffInSeconds = Math.floor((now - past) / 1000);

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  const units = [
    { name: 'year', seconds: 60 * 60 * 24 * 365 },
    { name: 'month', seconds: 60 * 60 * 24 * 30 },
    { name: 'week', seconds: 60 * 60 * 24 * 7 },
    { name: 'day', seconds: 60 * 60 * 24 },
    { name: 'hour', seconds: 60 * 60 },
    { name: 'minute', seconds: 60 },
    { name: 'second', seconds: 1 },
  ];

  for (const unit of units) {
    const value = Math.floor(diffInSeconds / unit.seconds);
    if (value >= 1 || unit.name === 'second') { // @ts-ignore
      return rtf.format(-value, unit.name);
    }
  }

  return 'just now';
}

interface Notification {
  id: string
  userId: string
  userName: string
  userImage: string
  authorId: string
  postId: string
  message: string
  isRead: boolean
  createdAt: Date
}

interface NotificationSidebarProps {
  isOpen: boolean
  onClose: () => void
  notifications: Notification[]
  onMarkAsRead: (id: string) => void
  onMarkAllAsRead: () => void
}

export default function NotificationSidebar({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
}: NotificationSidebarProps) {
  const hasUnread = notifications.some((notification) => !notification.isRead)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="border-b p-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-serif">Notifications</h2>
                  {hasUnread && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-sm text-gray-600 hover:text-gray-900 -ml-2"
                      onClick={onMarkAllAsRead}
                    >
                      Mark all as read
                    </Button>
                  )}
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Notifications List */}
              <ScrollArea className="flex-1">
                <div className="divide-y">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">No notifications yet</div>
                  ) : (
                    notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 relative transition-all duration-200 border-b border-gray-300 ${
                          !notification.isRead ? "bg-gray-200  cursor-pointer" : ""
                        }`}
                        onClick={() => !notification.isRead && onMarkAsRead(notification.id)}
                      >
                        <Link to={`/blog/${notification.postId}`} className="block group">
                          <div className="flex items-start gap-4">
                            <img
                              src={notification.userImage || "/placeholder.svg"}
                              alt={notification.userName}
                              className="w-10 h-10 rounded-full"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-900 group-hover:text-gray-600">
                                <span className="font-medium">{notification.userName}</span> {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {timeAgo(notification.createdAt)}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
