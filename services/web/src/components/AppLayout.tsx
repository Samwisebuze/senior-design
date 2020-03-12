import React from "react";
import { navigate } from "gatsby";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
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
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <List>
            {["Host", "Server", "Router", "Switch", "Firewall"].map(
              (text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              )
            )}
          </List>
          <Divider />
          <List>
            {["Connect"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    </BaseLayout>
  );
};

export default AppLayout;
