import React, { useEffect } from "react";
import { alpha, Avatar, Badge, Stack, styled, Typography } from "@mui/material";
import { CustomStackFullWidth } from "styled-components/CustomStyles.style";

import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";

import useGetUserInfo from "../../api-manage/hooks/react-query/user/useGetUserInfo";
import { CustomTypographyEllipsis } from "styled-components/CustomTypographies.style";
import moment from "moment";

export const StyledBadge = styled(Badge)(({ theme }) => ({
	"& .MuiBadge-badge": {
		backgroundColor: "#44b700",
		color: "#44b700",
		boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
		"&::after": {
			position: "absolute",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			borderRadius: "50%",
			animation: "ripple 1.2s infinite ease-in-out",
			border: "1px solid currentColor",
			content: '""',
		},
	},
	"@keyframes ripple": {
		"0%": {
			transform: "scale(.8)",
			opacity: 1,
		},
		"100%": {
			transform: "scale(2.4)",
			opacity: 0,
		},
	},
}));

const InfoCard = ({
	name,
	messageTime,
	receiver,
	userList,
	unRead,
	currentId,
	selectedId,
	last_message,
	adminImage,
}) => {
	const theme = useTheme();
	const { configData } = useSelector((state) => state.configData);
	const { profileInfo } = useSelector((state) => state.profileInfo);
	const ChatImageUrl = () => {
		if (userList.receiver_type === "vendor") {
			return userList?.receiver?.image_full_url;
		}
		if (userList.receiver_type === "delivery_man") {
			return userList?.receiver?.image_full_url;
		}
		if (userList?.receiver_type === "admin") {
			return configData?.logo_full_url;
		}
	};

	const { data, refetch, isLoading } = useGetUserInfo();
	useEffect(() => {
		refetch();
	}, []);
	const userImage =
		userList.receiver_type === "admin"
			? adminImage
			: userList?.receiver?.image;
	const isSender = data?.userinfo?.id === userList.last_message.sender_id;
	const isRead = !isLoading && !isSender && unRead > 0;
	const language_direction = localStorage.getItem("direction");

	return (
		<CustomStackFullWidth
			direction="row"
			spacing={2}
			alignItems="center"
			padding="10px 15px 10px 10px"
			sx={{
				background:
					selectedId === currentId &&
					alpha(theme.palette.primary.main, 0.2),
				borderRadius: "5px",
			}}
		>
			<StyledBadge
				overlap="circular"
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}

				//variant="dot"
			>
				<Avatar
					src={ChatImageUrl()}
					sx={{ width: "48px", height: "48px" }}
				/>
			</StyledBadge>
			<CustomStackFullWidth>
				<Stack
					direction="row"
					justifyContent="space-between"
					marginRight={language_direction === "rtl" ? "1rem" : "0rem"}
				>
					<Typography fontSize="14px" fontWeight="500">
						{receiver}
					</Typography>
					<Typography fontSize="12px">
						{moment(messageTime).format("hh:mm A")}
					</Typography>
				</Stack>
				<Stack
					direction="row"
					justifyContent="space-between"
					color={
						selectedId === currentId
							? theme.palette.neutral[100]
							: theme.palette.neutral[1000]
					}
				>
					<CustomTypographyEllipsis
						sx={{
							maxWidth: "130px",
							color:
								unRead > 0
									? theme.palette.neutral[1000]
									: theme.palette.neutral[400],
							textTransform: "capitalize ",
						}}
						fontSize={isRead > 0 ? "15px" : "12px"}
						fontWeight={isRead > 0 ? "700" : "400"}
						color={
							isRead > 0
								? theme.palette.neutral[1000]
								: theme.palette.neutral[500]
						}
					>
						{last_message?.message && last_message?.message}{" "}
					</CustomTypographyEllipsis>
					{!isLoading && !isSender && unRead > 0 && (
						<Stack
							width="16px"
							height="16px"
							backgroundColor={theme.palette.primary.main}
							justifyContent="center"
							alignItems="center"
							borderRadius="50%"
							color={theme.palette.neutral[100]}
						>
							<Typography fontSize="12px">{unRead}</Typography>
						</Stack>
					)}
				</Stack>
			</CustomStackFullWidth>
		</CustomStackFullWidth>
	);
};
export default InfoCard;
