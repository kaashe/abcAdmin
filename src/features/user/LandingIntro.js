import TemplatePointers from "./components/TemplatePointers";

function LandingIntro() {
  return (
    <div className="hero min-h-full rounded-l-xl bg-base-200">
      <div className="hero-content py-12">
        <div className="max-w-md">
          <img src="/logo.jpeg" />
          {/* <h1 className="text-3xl text-center font-bold ">
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content rounded-full w-10">
                <span className="text-2xl">A</span>
              </div>
            </div>
            BC
          </h1> */}
          {/* <TemplatePointers /> */}
        </div>
      </div>
    </div>
  );
}

export default LandingIntro;
