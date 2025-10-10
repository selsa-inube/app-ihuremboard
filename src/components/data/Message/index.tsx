import { formatDate as formatDateUtil } from "@utils/date";
import {
  MessageWrapper,
  MessageContent,
  Timestamp,
  IconWrapper,
} from "./styles";
import { Stack } from "@inubekit/inubekit";

export interface MessageProps {
  type: "sent" | "received" | "system";
  timestamp: number | string;
  message: string;
  icon?: React.ReactNode;
  onIconClick?: () => void;
}

const formatTimestamp = (timestamp: number | string) => {
  return formatDateUtil(new Date(timestamp).toISOString());
};

const Message = (props: MessageProps) => {
  const { type, timestamp, message, icon, onIconClick } = props;

  return (
    <MessageWrapper type={type}>
      <MessageContent type={type}>
        {type === "sent" && (
          <IconWrapper type={type} onClick={onIconClick} role="button">
            {icon}
          </IconWrapper>
        )}
        <Stack
          width="250px"
          justifyContent={type === "system" ? "center" : "flex-start"}
        >
          {message}
        </Stack>
        {type !== "sent" && (
          <IconWrapper type={type} onClick={onIconClick} role="button">
            {icon}
          </IconWrapper>
        )}
      </MessageContent>
      <Timestamp type={type}>{formatTimestamp(timestamp)}</Timestamp>
    </MessageWrapper>
  );
};

export { Message };
