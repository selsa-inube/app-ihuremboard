import { useState, useRef, useEffect } from "react";
import { MdOutlineSend, MdAttachFile, MdInfoOutline } from "react-icons/md";
import { Stack, Icon, Textfield } from "@inubekit/inubekit";

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
}

export const ManagementUI = ({
  isMobile,
  traceabilityData,
}: IManagementProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [localMessages, setLocalMessages] = useState<
    {
      id: number;
      type: "sent" | "received" | "system";
      text: string;
      date: string;
    }[]
  >([]);

  const chatContentRef = useRef<HTMLDivElement>(null);

  const combinedMessages = [
    ...(traceabilityData && traceabilityData.length > 0
      ? traceabilityData.map((item) => ({
          id: Number(item.id),
          type: "system" as const,
          text: `[${item.user}] ${item.action}${item.comments ? ` - ${item.comments}` : ""}`,
          date: item.date,
        }))
      : [
          {
            id: 0,
            type: "system" as const,
            text: "No hay trazabilidad disponible para esta solicitud.",
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
        type: "sent",
        text: newMessage,
        date: new Date().toISOString(),
      },
    ]);
    setNewMessage("");
  };

  return (
    <Fieldset
      title="Gestión de Solicitud"
      heightFieldset="340px"
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
              icon={<MdInfoOutline size={14} />}
              onIconClick={() => console.log("Detalle de mensaje:", msg)}
            />
          ))}
        </ChatContent>

        <form onSubmit={(e) => e.preventDefault()}>
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
              onClick={() => console.log("Abrir adjuntos")}
            />
            <Textfield
              id="text"
              placeholder="Ej.: Escribe tu mensaje"
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
