import {
  EnvelopeOpenIcon,
  GitHubLogoIcon,
  IdCardIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import { Button } from "./button";
import { MediumIcon } from "./icons";

const Socials = () => {
  return (
    <div className="flex gap-3">
      <Button variant="outline" size="logo" title="GitHub">
        <a
          href="https://github.com/Yidaotus"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <GitHubLogoIcon className="h-6 w-6" />
        </a>
      </Button>

      <Button variant="outline" size="logo" title="Medium Blog">
        <a
          href="https://medium.com/@yidaotus"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Medium Blog"
        >
          <MediumIcon size={6} />
        </a>
      </Button>

      <Button variant="outline" size="logo" title="LinkedIn">
        <a
          href="https://www.linkedin.com/in/voigtdaniel93/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <LinkedInLogoIcon className="h-6 w-6" />
        </a>
      </Button>

      <Button variant="outline" size="logo" title="Email">
        <a href="mailto:dvoigt1993@gmail.com" aria-label="Email">
          <EnvelopeOpenIcon className="h-6 w-6" />
        </a>
      </Button>

      <Button
        variant="outline"
        size="logo"
        aria-label="Download CV"
        title="Download my CV"
      >
        <a href="/cv.pdf" download="cv.pdf" aria-label="Download CV">
          <IdCardIcon className="h-6 w-6" />
        </a>
      </Button>
    </div>
  );
};

export default Socials;
