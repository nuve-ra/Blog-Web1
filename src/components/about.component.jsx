import { Link } from "react-router-dom";
import getFullDay from "../common/date";

const AboutUser = ({ className, bio, social_links, joinedAt }) => {
    return (
        <div className={"md:w-[90%] md:mt-7 " + className}>
            <p className="text-xl leading-7">{bio.length ? bio : "Nothing to read here"}</p>
            <div className="flex gap-x-7 gap-y-2 flex-wrap my-7 items-center text-dark-grey">
                {
                    Object.keys(social_links).map((key) => {
                        const link = social_links[key];
                        if (link) {
                            return (
                                <div key={key} className="social-link">
                                    <Link to={link} target="_blank">
                                        <i className={"fi " + (key !== 'website' ? "fi-brands-" + key : "fi-rr-globe") + " text-2xl hover:text-black"}></i>
                                    </Link>
                                </div>
                            );
                        }
                        return null;
                    })
                }
            </div>
            <p className="text-xl leading-7 text-dark-grey">Joined on {getFullDay(joinedAt)}</p>
        </div>
    );
}

export default AboutUser;
