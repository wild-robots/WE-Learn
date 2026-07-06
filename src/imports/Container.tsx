import svgPaths from "./svg-qitip7ba3e";

function Icon() {
  return (
    <div className="relative shrink-0 size-[13px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g clipPath="url(#clip0_4013_2116)" id="Icon">
          <path d={svgPaths.p880880} id="Vector" stroke="var(--stroke-0, #13C1AC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
          <path d="M10.8333 1.08333V3.25" id="Vector_2" stroke="var(--stroke-0, #13C1AC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
          <path d="M11.9167 2.16667H9.75" id="Vector_3" stroke="var(--stroke-0, #13C1AC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
          <path d={svgPaths.p38cb080} id="Vector_4" stroke="var(--stroke-0, #13C1AC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
        </g>
        <defs>
          <clipPath id="clip0_4013_2116">
            <rect fill="white" height="13" width="13" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-[rgba(19,193,172,0.1)] relative rounded-[8px] shrink-0 size-[26px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="flex-[1_0_0] h-[21px] min-h-px min-w-px relative" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[21px] left-0 text-[#1c3835] text-[14px] top-0" style={{ fontVariationSettings: "\'wdth\' 100" }}>
          Creator Assistant
        </p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[26px] relative shrink-0 w-[157.117px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[9.75px] items-center relative size-full">
        <Container3 />
        <Heading1 />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[13px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="Icon">
          <path d="M2.70833 6.5H10.2917" id="Vector" stroke="var(--stroke-0, #789693)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
          <path d="M6.5 2.70833V10.2917" id="Vector_2" stroke="var(--stroke-0, #789693)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[32.5px] rounded-[16px] size-[29.25px] top-0" data-name="Button">
      <Icon1 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[13px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="Icon">
          <path d="M9.75 3.25L3.25 9.75" id="Vector" stroke="var(--stroke-0, #789693)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
          <path d="M3.25 3.25L9.75 9.75" id="Vector_2" stroke="var(--stroke-0, #789693)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[68.25px] rounded-[16px] size-[29.25px] top-0" data-name="Button">
      <Icon2 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[8.13px] size-[13px] top-[8.13px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="Icon">
          <path d={svgPaths.p37b7e680} id="Vector" stroke="var(--stroke-0, #789693)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
          <path d="M8.125 1.625V11.375" id="Vector_2" stroke="var(--stroke-0, #789693)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute left-0 rounded-[8px] size-[29.25px] top-0" data-name="Button">
      <Icon3 />
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[29.25px] relative shrink-0 w-[97.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Button />
        <Button1 />
        <Button2 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute bg-white content-stretch flex h-[64px] items-center justify-between left-0 pb-px px-[19.5px] top-0 w-[398px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(19,193,172,0.2)] border-b border-solid inset-0 pointer-events-none" />
      <Container2 />
      <Container4 />
    </div>
  );
}

function TextInput() {
  return (
    <div className="bg-[rgba(255,255,255,0)] h-[29.25px] relative rounded-[16px] shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center p-[3.25px] relative size-full">
          <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#789693] text-[14px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
            Ask about AI components...
          </p>
        </div>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[13px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g clipPath="url(#clip0_4013_2116)" id="Icon">
          <path d={svgPaths.p880880} id="Vector" stroke="var(--stroke-0, #13C1AC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
          <path d="M10.8333 1.08333V3.25" id="Vector_2" stroke="var(--stroke-0, #13C1AC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
          <path d="M11.9167 2.16667H9.75" id="Vector_3" stroke="var(--stroke-0, #13C1AC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
          <path d={svgPaths.p38cb080} id="Vector_4" stroke="var(--stroke-0, #13C1AC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
        </g>
        <defs>
          <clipPath id="clip0_4013_2116">
            <rect fill="white" height="13" width="13" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[32.656px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[16.5px] left-[16.5px] text-[#13c1ac] text-[11px] text-center top-[-0.5px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
          C3S/O
        </p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[rgba(19,193,172,0.05)] flex-[1_0_0] h-[29.25px] min-h-px min-w-px relative rounded-[8px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(19,193,172,0.2)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.375px] items-center justify-center p-px relative size-full">
        <Icon4 />
        <Text />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[29.25px] relative shrink-0 w-[75.281px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Button3 />
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[13px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="Icon">
          <path d="M6.5 10.2917V11.9167" id="Vector" stroke="var(--stroke-0, #789693)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
          <path d={svgPaths.pbeb0700} id="Vector_2" stroke="var(--stroke-0, #789693)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
          <path d={svgPaths.pea34000} id="Vector_3" stroke="var(--stroke-0, #789693)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[29.25px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon5 />
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[13px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g clipPath="url(#clip0_4013_2095)" id="Icon">
          <path d={svgPaths.p2ca29780} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
          <path d={svgPaths.p3f86e380} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
        </g>
        <defs>
          <clipPath id="clip0_4013_2095">
            <rect fill="white" height="13" width="13" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#13c1ac] flex-[1_0_0] h-[29.25px] min-h-px min-w-px relative rounded-[8px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon6 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[29.25px] relative shrink-0 w-[65px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6.5px] items-center relative size-full">
        <Button4 />
        <Button5 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex h-[29.25px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container9 />
      <Container10 />
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-white h-[96.25px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(19,193,172,0.2)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col gap-[9.75px] items-start pb-px pt-[14px] px-[14px] relative size-full">
        <TextInput />
        <Container8 />
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[15px] opacity-40 relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[15px] left-[179.56px] text-[#789693] text-[10px] text-center top-[0.5px] tracking-[0.2px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Powered by Enlighten AI • Creator Assistant v1.2
      </p>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[13px] h-[124.25px] items-start relative shrink-0 w-full" data-name="Container">
      <Container7 />
      <Paragraph />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[164.25px] items-start left-0 pt-[20.5px] px-[19.5px] top-[483.75px] w-[398px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(19,193,172,0.2)] border-solid border-t inset-0 pointer-events-none" />
      <Container6 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[26px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g id="Icon">
          <path d="M13 8.66667V4.33333H8.66667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.16667" />
          <path d={svgPaths.p3a5d6980} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.16667" />
          <path d="M2.16667 15.1667H4.33333" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.16667" />
          <path d="M21.6667 15.1667H23.8333" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.16667" />
          <path d="M16.25 14.0833V16.25" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.16667" />
          <path d="M9.75 14.0833V16.25" id="Vector_6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container15() {
  return (
    <div className="bg-gradient-to-b from-[#13c1ac] relative rounded-[16px] shrink-0 size-[45.5px] to-[#c8f5f0]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon7 />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[27px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="-translate-x-1/2 absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[27px] left-[118.48px] text-[#1c3835] text-[18px] text-center top-0 tracking-[-0.36px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Hey, Designer
      </p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[21px] left-[119.5px] text-[#789693] text-[14px] text-center top-0" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        What are you looking to build today?
      </p>
    </div>
  );
}

function Container16() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[237.953px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Heading />
        <Paragraph1 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col gap-[16.25px] h-[117.75px] items-center relative shrink-0 w-full" data-name="Container">
      <Container15 />
      <Container16 />
    </div>
  );
}

function Container19() {
  return <div className="absolute bg-[rgba(19,193,172,0.05)] blur-[64px] left-[280px] rounded-[16777200px] size-[104px] top-[-51px]" data-name="Container" />;
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[13px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g clipPath="url(#clip0_4013_2089)" id="Icon">
          <path d={svgPaths.p880880} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
          <path d="M10.8333 1.08333V3.25" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
          <path d="M11.9167 2.16667H9.75" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
          <path d={svgPaths.p38cb080} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
        </g>
        <defs>
          <clipPath id="clip0_4013_2089">
            <rect fill="white" height="13" width="13" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container22() {
  return (
    <div className="bg-[#13c1ac] relative rounded-[16777200px] shrink-0 size-[29.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon8 />
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[21px] relative shrink-0 w-[125.281px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[21px] left-0 text-[#1c3835] text-[14px] top-0" style={{ fontVariationSettings: "\'wdth\' 100" }}>
          Real Product Flow
        </p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute content-stretch flex gap-[9.75px] h-[29.25px] items-center left-0 top-0 w-[292px]" data-name="Container">
      <Container22 />
      <Heading2 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[38.391px] left-0 top-[42.25px] w-[292px]" data-name="Paragraph">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.2px] left-0 text-[#789693] text-[12px] top-0 w-[273px] whitespace-pre-wrap" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Experience AI patterns in a simulated production sequence to test agent behaviors and UX.
      </p>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute bg-[#13c1ac] h-[29.25px] left-0 rounded-[8px] top-[96.89px] w-[292px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[21px] left-[146.07px] text-[14px] text-center text-white top-[4.13px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Launch Agent Flow Demo
      </p>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute h-[126.141px] left-[20.5px] top-[20.5px] w-[292px]" data-name="Container">
      <Container21 />
      <Paragraph2 />
      <Button6 />
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[167.141px] relative rounded-[16px] shrink-0 w-full" data-name="Container" style={{ backgroundImage: "linear-gradient(153.347deg, rgba(19, 193, 172, 0.1) 0%, rgba(200, 245, 240, 0.05) 100%)" }}>
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Container19 />
        <Container20 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(19,193,172,0.2)] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[18px] left-[167.29px] text-[#789693] text-[12px] text-center top-[-0.5px] tracking-[0.6px] uppercase" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Popular explorations
      </p>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[204.07px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] left-0 text-[#1c3835] text-[13px] top-[-0.5px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>{`Show me all 'Live' AI components`}</p>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[#ebf5f4] col-1 justify-self-stretch relative rounded-[8px] row-1 self-stretch shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(19,193,172,0.2)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[14px] pr-[114.93px] py-px relative size-full">
          <Text1 />
        </div>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[234.938px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] left-0 text-[#1c3835] text-[13px] top-[-0.5px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>{`Explain the 'Governor Control' pattern`}</p>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-[#ebf5f4] col-1 justify-self-stretch relative rounded-[8px] row-2 self-stretch shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(19,193,172,0.2)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[14px] pr-[84.063px] py-px relative size-full">
          <Text2 />
        </div>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[236.672px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] left-0 text-[#1c3835] text-[13px] top-[-0.5px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>{`How do I implement 'Dynamic Blocks'?`}</p>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="bg-[#ebf5f4] col-1 justify-self-stretch relative rounded-[8px] row-3 self-stretch shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(19,193,172,0.2)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[14px] pr-[82.328px] py-px relative size-full">
          <Text3 />
        </div>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[264.531px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] left-0 text-[#1c3835] text-[13px] top-[-0.5px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
          Create a dashboard for agent performance
        </p>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="bg-[#ebf5f4] col-1 justify-self-stretch relative rounded-[8px] row-4 self-stretch shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(19,193,172,0.2)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[14px] pr-[54.469px] py-px relative size-full">
          <Text4 />
        </div>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="gap-x-[8.125px] gap-y-[8.125px] grid grid-cols-[repeat(1,minmax(0,1fr))] grid-rows-[repeat(4,minmax(0,1fr))] h-[214.375px] relative shrink-0 w-full" data-name="Container">
      <Button7 />
      <Button8 />
      <Button9 />
      <Button10 />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col gap-[9.75px] h-[242.125px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph3 />
      <Container24 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col gap-[19.5px] h-[428.766px] items-start relative shrink-0 w-full" data-name="Container">
      <Container18 />
      <Container23 />
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[631.016px] relative shrink-0 w-[333px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[32.5px] items-start pt-[26px] relative size-full">
        <Container14 />
        <Container17 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[398px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center overflow-clip pb-[-243.766px] pt-[32.5px] relative rounded-[inherit] size-full">
        <Container13 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex flex-col h-[419.75px] items-start left-0 overflow-clip top-[64px] w-[398px]" data-name="Container">
      <Container12 />
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-white border border-[rgba(19,193,172,0.2)] border-solid overflow-clip relative rounded-[24px] size-full" data-name="Container">
      <Container1 />
      <Container5 />
      <Container11 />
    </div>
  );
}