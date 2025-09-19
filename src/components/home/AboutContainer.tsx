import ModalWindow from "../builderColumn/ModalWindow";
import AboutList from "./AboutList";
import AboutTopic from "./AboutTopic";

function AboutContainer({ isOpen, setIsOpen }) {
  return (
    <ModalWindow
      isOpen={isOpen}
      setIsOpen={() => setIsOpen(false)}
      title="About"
    >
      <AboutTopic
        topic="About Me"
        text="Hi, I'm a software developer from Anchorage, Alaska. I'd love to hear your feedback, especially if anything on here is confusing. You can email me at michaelseedev@gmail.com. Feel free to check out my links and I hope you enjoy Modular Resume!"
      />
      <AboutList />
      <AboutTopic
        topic="About Modular Resume"
        text="Modular Resume is built in React using Vite, React-to-PDF, Sonner, Redux, and Router. I was getting tired of constantly tweaking resumes and having to play with formatting on word editors. The templating sites out there are nice but none of them allowed me to tweak things as much as I'd like. I built this to solve those problems!"
      />
    </ModalWindow>
  );
}

export default AboutContainer;
