import {
	alpha,
	Grid,
	Stack,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import CustomContainer from "../../container";
import { StyledFooterTop } from "../Footer.style";
import Subscribe from "./Subscribe";
import SubscribeImage from "./SubscribeImage";

const FooterTop = (props) => {
	const { landingPageData } = props;

	const theme = useTheme();
	const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<>
			<StyledFooterTop>
				<CustomContainer>
					<Grid
						container
						alignItems="flex-end"
						justifyContent="center"
						sx={{ height: "100%" }}
					>
						<Grid item xs={8} sm={6} md={3} position="relative">
							<Box
								sx={{
									mt: "-65px",
									textAlign: { xs: "center", md: "left" },
									ml: { md: "-30px" },
									position: { sm: "absolute", bottom: "5px" },
								}}
							>
								<SubscribeImage />
							</Box>
						</Grid>
						<Grid
							item
							xs={12}
							sm={6}
							md={9}
							container
							alignItems="center"
							justifyContent="center"
							sx={{
								py: 3,
								pl: { lg: 2 },
								pb: { lg: 4 },
							}}
						>
							<Grid
								item
								xs={12}
								sm={12}
								md={5}
								align={isSmall ? "center" : "left"}
							>
								<Stack
									height="100%"
									alignItems={isSmall ? "center" : "flex-start"}
									justifyContent="center"
									spacing={1}
									p="10px"
									pt={0}
								>
									<Typography
										fontWeight={700}
										fontSize={{ xs: "1rem", md: "2.25rem" }}
										component="h2"
									>
										{landingPageData?.fixed_newsletter_title}
									</Typography>
									<Typography
										variant="h7"
										fontSize={{ xs: "12px", md: "14px" }}
										fontWeight="400"
										sx={{
											color: (theme) =>
												alpha(theme.palette.neutral[500], 0.8),
										}}
										component="p"
									>
										{landingPageData?.fixed_newsletter_sub_title}
									</Typography>
								</Stack>
							</Grid>
							<Grid item xs={12} sm={12} md={7}>
								<Stack
									alignItems="end"
									justifyContent="flex-end"
									sx={{ ml: { md: 6 } }}
								>
									<Subscribe />
								</Stack>
							</Grid>
						</Grid>
					</Grid>
				</CustomContainer>
			</StyledFooterTop>
		</>
	);
};

FooterTop.propTypes = {};

export default FooterTop;
