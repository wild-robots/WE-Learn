function Frame1() {
  return (
    <div className="bg-[#f0f0f0] content-stretch flex items-start overflow-clip px-[16px] py-[8px] relative rounded-[20px] shrink-0" data-name="Frame">
      <p className="font-['Inter:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-black">All</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-start overflow-clip px-[16px] py-[8px] relative shrink-0" data-name="Frame">
      <p className="font-['Inter:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#666] text-[14px]">My Babels</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex items-start overflow-clip px-[16px] py-[8px] relative shrink-0" data-name="Frame">
      <p className="font-['Inter:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#666] text-[14px]">Featured Babels</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex items-start overflow-clip px-[16px] py-[8px] relative shrink-0" data-name="Frame">
      <p className="font-['Inter:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#666] text-[14px]">Shared with me</p>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative size-full" data-name="Frame">
      <Frame1 />
      <Frame2 />
      <Frame3 />
      <Frame4 />
    </div>
  );
}