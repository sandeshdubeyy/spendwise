import FeatureCards from "../../../components/landing/FeatureCards";
import HeroSection from "../../../components/landing/HeroSection";
import ProcessSection from "../../../components/landing/ProcessSection";
import UpcomingFeatures from "../../../components/landing/UpcomingFeatures";
import BrandWrapper from "../../../components/common/BrandWrapper";
import BrandBackdrop from "../../../components/common/BrandBackdrop";

const Landing = () => {
    return (
        <>
            <BrandBackdrop />
            <BrandWrapper>
                <HeroSection />
                <FeatureCards />
                <ProcessSection />
                <UpcomingFeatures />
                {/* future homepage sections go here */}
            </BrandWrapper>
        </>
    );
};

export default Landing;