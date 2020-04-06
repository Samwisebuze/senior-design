import React from "react";
import { navigate } from "gatsby";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { isLoggedIn, logout } from "../util/auth";
import BaseLayout from "./BaseLayout";

const drawerWidth = 240;

const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      height: "100%",
      width: "100%",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
    },
    toolbar: { width: "100%", ...theme.mixins.toolbar },
  })
);

const AppLayout: React.FC = ({ children }) => {
  const classes = useStyles();

  const handleLogout = () => {
    logout(() => navigate(`/login`));
  };

  return (
    <BaseLayout>
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <StyledToolbar>
            <Typography variant="h6" noWrap>
              Virtuoso
            </Typography>
            {isLoggedIn() ? (
              <Button color="inherit" onClick={handleLogout}>
                Log Out
              </Button>
            ) : null}
          </StyledToolbar>
        </AppBar>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    </BaseLayout>
  );
};

export default AppLayout;
