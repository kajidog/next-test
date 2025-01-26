"use client";

import { useState } from "react";
import {
  Box,
  Popover,
  List,
  ListItem,
  ListItemText,
  Typography,
  Fade,
  Button,
  Paper,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { getNavigationIcon } from "./navigation/navigationIcons";
import { useNavigationData } from "./navigation/navigationData";
import { useBotFlow } from "../hooks/useBotFlow";

export interface FooterNavigationProps {
  setIsAddMode: ReturnType<typeof useBotFlow>["setIsAddMode"];
  onSave: ReturnType<typeof useBotFlow>["onSave"];
}

export default function FooterNavigation(props: FooterNavigationProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { navigationData } = useNavigationData();
  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    sectionId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setActiveSection(sectionId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setActiveSection(null);
  };

  const handleItemClick = (label: string) => {
    console.log("Clicked item ID:", label, activeSection);

    props.setIsAddMode({
      isAddMode: true,
      type: activeSection ?? "",
      label,
    });
    handleClose();
  };

  return (
    <Paper
      elevation={8}
      sx={{
        position: "fixed",
        bottom: 16,
        left: 100,
        right: 100,
        height: "56px",
        bgcolor: "background.paper",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        px: 2,
        justifyContent: "space-between",
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
      }}
    >
      <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
        {navigationData.map((section) => (
          <Button
            key={section.id}
            onClick={(e) => handleClick(e, section.id)}
            startIcon={getNavigationIcon(section.id)}
            variant={activeSection === section.id ? "contained" : "text"}
            size="medium"
            sx={{
              textTransform: "none",
              px: 1.5,
              py: 0.75,
              borderRadius: "8px",
              minWidth: "auto",
              color:
                activeSection === section.id
                  ? "primary.contrastText"
                  : "text.primary",
              "&:hover": {
                backgroundColor:
                  activeSection === section.id
                    ? "primary.dark"
                    : "rgba(0, 0, 0, 0.04)",
              },
              transition: "all 0.2s ease",
            }}
          >
            {section.title}
          </Button>
        ))}
      </Box>

      <Button
        variant="contained"
        color="primary"
        startIcon={<SaveIcon />}
        sx={{
          px: 3,
          py: 0.75,
          borderRadius: "8px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
            backgroundColor: "primary.dark",
          },
          transition: "all 0.2s ease",
        }}
        onClick={props.onSave}
      >
        保存
      </Button>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          mb: 2,
          "& .MuiPopover-paper": {
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
            border: "1px solid",
            borderColor: "divider",
          },
        }}
        TransitionComponent={Fade}
      >
        <Box
          sx={{
            p: 2,
            minWidth: 240,
            backgroundColor: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(8px)",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              mb: 2,
              px: 1,
              fontWeight: 600,
              color: "text.primary",
              letterSpacing: "-0.01em",
            }}
          >
            {
              navigationData.find((section) => section.id === activeSection)
                ?.title
            }
          </Typography>
          <List sx={{ p: 0 }}>
            {navigationData
              .find((section) => section.id === activeSection)
              ?.items.map((item) => (
                <ListItem
                  key={item.id}
                  onClick={() => {
                    handleItemClick(item.id);
                  }}
                  component="button"
                  sx={{
                    py: 1,
                    px: 1.5,
                    borderRadius: "8px",
                    mb: 0.5,
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.03)",
                    },
                    transition: "all 0.15s ease",
                  }}
                >
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      sx: {
                        fontSize: "0.875rem",
                        color: "text.primary",
                        fontWeight: 500,
                      },
                    }}
                  />
                </ListItem>
              ))}
          </List>
        </Box>
      </Popover>
    </Paper>
  );
}
