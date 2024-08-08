import TemplatePointers from "./components/TemplatePointers";

function LandingIntro() {
  return (
    <div className="hero min-h-full rounded-l-xl bg-base-200" style={{ backgroundImage: 'url("./backgroung.jpeg")', height: '200px', opacity: 1  }}>
      <div className="hero-content py-12" style={{backgroundColor:'white', opacity: 0.7}} >
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
      {/* </div> */}
    </div>
  );
}

export default LandingIntro;
