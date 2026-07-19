import { useState } from "react";
import { Crown, Search, UserPlus, ArrowRight } from "lucide-react";
import { getBubbleMembers } from "../../data/mock";
import { AddMemberModal } from "./AddMemberModal";
import type { Bubble, Member } from "../../types";

interface Props {
  bubble: Bubble;
  isFounder: boolean;
  onJoin?: () => void;
}

function MemberCard({ member, isFounder, onRemove }: { member: Member; isFounder: boolean; onRemove?: () => void }) {
  const [confirm, setConfirm] = useState(false);

  return (
    <div className="bg-white rounded-xl p-4 flex items-start gap-4" style={{ boxShadow: 'var(--shadow-sm)' }}>
      <div className="relative shrink-0">
        <img src={member.avatar} alt={member.name} className="size-12 rounded-full object-cover border-2 border-[#E9ECEF]" />
        {member.role === 'founder' && (
          <div className="absolute -top-1 -right-1 size-5 bg-[#FAB005] rounded-full flex items-center justify-center">
            <Crown className="size-3 text-white" strokeWidth={2} fill="white" />
          </div>
        )}
        {member.online && (
          <div className="absolute bottom-0 right-0 size-3 bg-[#40C057] rounded-full border-2 border-white" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-semibold text-[15px] text-[#212529]" style={{ fontFamily: 'var(--font-display)' }}>
            {member.name}
          </p>
          <span
            className="text-[11px] px-2 py-0.5 rounded-full font-medium"
            style={{
              fontFamily: 'var(--font-body)',
              background: member.role === 'founder' ? '#FFF3CD' : '#F1F3F5',
              color: member.role === 'founder' ? '#856404' : '#6C757D',
            }}
          >
            {member.role === 'founder' ? 'Founder' : 'Member'}
          </span>
        </div>
        <p className="text-[13px] text-[#6C757D] mt-0.5" style={{ fontFamily: 'var(--font-body)' }}>
          {member.title}
        </p>
        <div className="flex items-center gap-3 mt-1.5 text-[12px] text-[#ADB5BD]"
          style={{ fontFamily: 'var(--font-body)' }}>
          <span>Joined {member.joinDate}</span>
          <span>·</span>
          <span>{member.postCount} posts</span>
          {member.online && <span className="text-[#40C057]">· Online</span>}
        </div>
      </div>

      {/* Founder can remove other members */}
      {isFounder && member.role !== 'founder' && (
        <div className="shrink-0">
          {!confirm ? (
            <button
              onClick={() => setConfirm(true)}
              className="text-[12px] text-[#ADB5BD] hover:text-[#FA5252] transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Remove
            </button>
          ) : (
            <div className="flex flex-col items-end gap-1.5">
              <p className="text-[11px] text-[#495057]" style={{ fontFamily: 'var(--font-body)' }}>Are you sure?</p>
              <div className="flex gap-2">
                <button onClick={() => setConfirm(false)} className="text-[12px] text-[#6C757D] hover:underline"
                  style={{ fontFamily: 'var(--font-body)' }}>Cancel</button>
                <button onClick={onRemove} className="text-[12px] text-[#FA5252] font-semibold hover:underline"
                  style={{ fontFamily: 'var(--font-body)' }}>Remove</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function MembersTab({ bubble, isFounder, onJoin }: Props) {
  const [search, setSearch] = useState('');
  const [members, setMembers] = useState<Member[]>(getBubbleMembers(bubble));
  const [showAddMember, setShowAddMember] = useState(false);

  const filtered = members.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  function removeMember(id: string) {
    setMembers(ms => ms.filter(m => m.id !== id));
  }

  const founders = filtered.filter(m => m.role === 'founder');
  const regularMembers = filtered.filter(m => m.role !== 'founder');

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-[18px] font-bold text-[#212529]" style={{ fontFamily: 'var(--font-display)' }}>
            Members
          </h2>
          <p className="text-[13px] text-[#6C757D]" style={{ fontFamily: 'var(--font-body)' }}>
            {members.length} of {bubble.maxSeats} seats taken
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap justify-end">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400" strokeWidth={1.75} />
            <input
              type="text"
              placeholder="Search members..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 min-h-[44px] rounded-xl border border-[#E9ECEF] text-[14px] bg-white focus:outline-none focus:border-[#00a79d] w-44 sm:w-52"
              style={{ fontFamily: 'var(--font-body)' }}
            />
          </div>

          {/* Action button: Add Member (founder) or Join (visitor) */}
          {isFounder ? (
            <button
              onClick={() => setShowAddMember(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] rounded-xl bg-[#00a79d] text-white text-[14px] font-semibold hover:bg-[#008f86] transition-colors shrink-0"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <UserPlus className="size-4" strokeWidth={1.75} />
              Add Member
            </button>
          ) : (
            <button
              onClick={onJoin}
              disabled={bubble.takenSeats >= bubble.maxSeats}
              title={bubble.takenSeats >= bubble.maxSeats ? 'This Bubble is full' : undefined}
              className="flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] rounded-xl bg-[#00a79d] text-white text-[14px] font-semibold hover:bg-[#008f86] transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Join <ArrowRight className="size-4" strokeWidth={2} />
            </button>
          )}
        </div>
      </div>

      {/* Founder(s) */}
      {founders.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-[12px] text-[#ADB5BD] font-semibold uppercase tracking-wider"
            style={{ fontFamily: 'var(--font-body)' }}>
            Founder
          </p>
          {founders.map(m => (
            <MemberCard key={m.id} member={m} isFounder={isFounder} />
          ))}
        </div>
      )}

      {/* Members */}
      {regularMembers.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-[12px] text-[#ADB5BD] font-semibold uppercase tracking-wider"
            style={{ fontFamily: 'var(--font-body)' }}>
            Members ({regularMembers.length})
          </p>
          {regularMembers.map(m => (
            <MemberCard
              key={m.id}
              member={m}
              isFounder={isFounder}
              onRemove={() => removeMember(m.id)}
            />
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-12 text-[#6C757D]" style={{ fontFamily: 'var(--font-body)' }}>
          No members found matching "{search}"
        </div>
      )}

      {showAddMember && (
        <AddMemberModal bubbleTitle={bubble.title} onClose={() => setShowAddMember(false)} />
      )}
    </div>
  );
}
