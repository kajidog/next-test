"use client";

import Delete from "@mui/icons-material/DeleteOutline";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MessageStore } from "@/types/messageStore";

interface MessageStoreTableProps {
  messageStores: MessageStore[];
  onEdit: (bot: MessageStore) => void;
}

export function MessageServiceTable({ messageStores }: MessageStoreTableProps) {
  const router = useRouter();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>サービス名</TableCell>
            <TableCell style={{ width: 300 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {messageStores.map((store) => (
            <TableRow key={"dash_message_table_" + store.name}>
              <TableCell>{store.name}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<Delete />}
                  sx={{ mr: 1 }}
                >
                  削除
                </Button>
                <Link href={`${store.url}/api/messages/search`}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<OpenInNewIcon />}
                    onClick={() =>
                      router.push(`${store.url}/api/messages/search`)
                    }
                  >
                    Open
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
