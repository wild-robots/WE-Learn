import { useState } from "react";
import { X, UserPlus, Copy, Check } from "lucide-react";

interface Props {
  bubbleTitle: string;
  onClose: () => void;
}

export function AddMemberModal({ bubbleTitle, onClose }: Props) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const inviteLink = `${window.location.origin}${window.location.pathname}`;

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl w-full max-w-sm overflow-hidden"
        style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.18)' }}>
        <div className="px-5 pt-5 pb-4 border-b border-[#E9ECEF] flex items-center justify-between">
          <h3 className="font-bold text-[17px] text-[#212529] flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
            <UserPlus className="size-5 text-[#00a79d]" strokeWidth={1.75} />
            Add a member
          </h3>
          <button onClick={onClose} className="text-[#ADB5BD] hover:text-[#495057] transition-colors">
            <X className="size-5" strokeWidth={1.75} />
          </button>
        </div>

        <div className="px-5 py-4 flex flex-col gap-4">
          <p className="text-[13px] text-[#6C757D]" style={{ fontFamily: 'var(--font-body)' }}>
            Invite someone to join <strong>{bubbleTitle}</strong>.
          </p>

          {sent ? (
            <div className="bg-[#E5F5F4] rounded-xl p-3 text-[13px] text-[#008f86]" style={{ fontFamily: 'var(--font-body)' }}>
              ✓ Invite sent to <strong>{email}</strong>!
            </div>
          ) : (
            <form onSubmit={handleSend} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[#495057]" style={{ fontFamily: 'var(--font-body)' }}>
                  Email address
                </label>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  placeholder="friend@example.com"
                  className="px-3 py-2.5 rounded-xl border border-[#E9ECEF] text-[14px] bg-[#F8F9FA] focus:outline-none focus:border-[#00a79d]"
                  style={{ fontFamily: 'var(--font-body)' }}
                />
              </div>
              <button type="submit"
                className="py-2.5 rounded-xl bg-[#00a79d] text-white text-[14px] font-semibold hover:bg-[#008f86] transition-colors"
                style={{ fontFamily: 'var(--font-body)' }}>
                Send invite
              </button>
            </form>
          )}

          <div className="h-px bg-[#F1F3F5]" />

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-[#495057]" style={{ fontFamily: 'var(--font-body)' }}>
              Or share an invite link
            </label>
            <div className="flex gap-2">
              <input
                type="text" readOnly value={inviteLink}
                className="flex-1 px-3 py-2.5 rounded-xl border border-[#E9ECEF] text-[13px] bg-[#F8F9FA] text-[#6C757D] truncate"
                style={{ fontFamily: 'var(--font-body)' }}
              />
              <button onClick={handleCopy} type="button"
                className="shrink-0 px-3 py-2.5 rounded-xl border border-[#E9ECEF] hover:bg-[#F8F9FA] transition-colors"
                title="Copy link">
                {copied ? <Check className="size-4 text-[#00a79d]" strokeWidth={1.75} /> : <Copy className="size-4 text-[#6C757D]" strokeWidth={1.75} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
