import { Linkedin, Mail } from 'lucide-react';

const linkedinLink: string =
  'https://www.linkedin.com/in/yurii-skoropad-791a38111/';

const Footer = () => {
  return (
    <footer className="bg-primary text-background flex justify-end p-5 gap-5">
      <a href={linkedinLink} target="_blank">
        <Linkedin />
      </a>
      <a href="mailto: lvivgeorge@gmail.com">
        <Mail />
      </a>
    </footer>
  );
};

Footer.displayName = 'Footer';

export default Footer;
