import { useState, useRef, useEffect } from "react";
import { MdOutlineSend, MdAttachFile } from "react-icons/md";
import { Stack, Icon, Textfield } from "@inubekit/inubekit";

import { labels } from "@i18n/labels";
import { Fieldset } from "@components/data/Fieldset";
import { Message } from "@components/data/Message";

import { ChatContent } from "./styles";

export interface ITraceabilityItem {
  id: string;
  action: string;
  date: string;
  user: string;
  comments?: string;
}

interface IManagementProps {
  isMobile: boolean;
  traceabilityData: ITraceabilityItem[];
  currentUserName?: string;
}

export const ManagementUI = ({
  isMobile,
  traceabilityData,
  currentUserName = "",
}: IManagementProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [localMessages, setLocalMessages] = useState<
    {
      id: number | string;
      type: "sent" | "received" | "system";
      text: string;
      date: string;
    }[]
  >([]);

  const chatContentRef = useRef<HTMLDivElement>(null);

  const combinedMessages = [
    ...(traceabilityData && traceabilityData.length > 0
      ? traceabilityData.map((item) => {
          const isFromCurrentUser =
            item.user?.toLowerCase().trim() ===
            currentUserName.toLowerCase().trim();

          return {
            id: item.id,
            type: isFromCurrentUser ? ("sent" as const) : ("received" as const),
            text: item.comments ?? "",
            date: item.date,
          };
        })
      : [
          {
            id: "0",
            type: "system" as const,
            text: labels.requests.management.noTraceability,
            date: new Date().toISOString(),
          },
        ]),
    ...localMessages,
  ];

  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [combinedMessages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    setLocalMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1000,
        type: "sent" as const,
        text: newMessage,
        date: new Date().toISOString(),
      },
    ]);
    setNewMessage("");
  };

  return (
    <Fieldset
      title={labels.requests.management.fieldsetTitle}
      heightFieldset="472px"
      aspectRatio={isMobile ? "auto" : "1"}
    >
      <Stack direction="column" height={!isMobile ? "100%" : "292px"}>
        <ChatContent ref={chatContentRef}>
          {combinedMessages.map((msg) => (
            <Message
              key={msg.id}
              type={msg.type}
              timestamp={msg.date}
              message={msg.text}
            />
          ))}
        </ChatContent>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <Stack
            alignItems="center"
            direction="row"
            gap="16px"
            margin="2px 4px"
          >
            <Icon
              appearance="primary"
              cursorHover
              size="24px"
              icon={<MdAttachFile />}
            />
            <Textfield
              id="text"
              placeholder={labels.requests.management.placeholderMessage}
              fullwidth
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <Icon
              appearance="primary"
              cursorHover
              size="24px"
              icon={<MdOutlineSend />}
              onClick={handleSendMessage}
            />
          </Stack>
        </form>
      </Stack>
    </Fieldset>
  );
};
