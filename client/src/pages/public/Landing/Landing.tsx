import FeatureCards from "../../../components/landing/FeatureCards";
import HeroSection from "../../../components/landing/HeroSection";
import ProcessSection from "../../../components/landing/ProcessSection";
import UpcomingFeatures from "../../../components/landing/UpcomingFeatures";
import BrandWrapper from "../../../components/common/BrandWrapper";
import BrandBackdrop from "../../../components/common/BrandBackdrop";
import FeatureFlowSection from "../../../components/landing/FeatureFlowSection";

const Landing = () => {
    return (
        <>
            <BrandBackdrop />
            <BrandWrapper>
                <HeroSection />
                <FeatureCards />
                <FeatureFlowSection />
                <ProcessSection />
                <UpcomingFeatures />
                {/* future homepage sections go here */}
            </BrandWrapper>
        </>
    );
};

export default Landing;