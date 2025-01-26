"use client";

import DeleteForeverOutlined from "@mui/icons-material/DeleteForeverOutlined";
import EditIcon from "@mui/icons-material/Edit";
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
import { useRouter } from "next/navigation";
import { Bot } from "@/types/bot";

interface BotTableProps {
  bots: Bot[];
  type: "discord" | "dify";
  onEdit: (bot: Bot) => void;
}

export function BotTable({ bots, type, onEdit }: BotTableProps) {
  const router = useRouter();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Bot名</TableCell>
            <TableCell style={{ width: 300 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bots.map((bot) => (
            <TableRow key={bot.id}>
              <TableCell>{bot.name}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<DeleteForeverOutlined />}
                  onClick={() => onEdit(bot)}
                  sx={{ mr: 1 }}
                >
                  削除
                </Button>
                {type === "dify" && (
                  <>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => onEdit(bot)}
                      sx={{ mr: 1 }}
                    >
                      編集
                    </Button>
                  </>
                )}
                {type === "discord" && (
                  <>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<OpenInNewIcon />}
                      onClick={() => router.push(`/${bot.name}/flow`)}
                    >
                      開く
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
