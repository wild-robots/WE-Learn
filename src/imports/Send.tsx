import svgPaths from "./svg-axpfdjgeyk";

function Send1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Send">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_4029_6482)" id="Send">
          <path clipRule="evenodd" d={svgPaths.p2d22aa30} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon" />
        </g>
        <defs>
          <clipPath id="clip0_4029_6482">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default function Send() {
  return (
    <div className="bg-[#11b09f] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[20px] shadow-[0px_4px_12px_0px_rgba(17,176,159,0.25)] size-full" data-name="send">
      <Send1 />
    </div>
  );
}