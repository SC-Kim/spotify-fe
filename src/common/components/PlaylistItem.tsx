import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";

const PlayListItemContainer = styled(ListItemButton)(({ theme, selected }) => ({
  padding: "8px",
  alignItems: "center",
  borderRadius: "8px",
  backgroundColor: selected ? theme.palette.action.active : "",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));
const PlaylistAvatar = styled(Avatar)({
  width: "48px",
  height: "48px",
  borderRadius: "8px",
});
const PlaylistName = styled(Typography)({
  fontWeight: "bold",
  color: "#1db954",
});
interface PlaylistItemProps {
  image: string | null;
  name: string;
  artistName: string | null;
  id: string;
  handleClick: (id: string) => void;
  selected?: boolean;
}

const PlaylistItem = ({
  image,
  name,
  artistName,
  id,
  handleClick,
  selected,
}: PlaylistItemProps) => {
  return (
    <PlayListItemContainer
      onClick={() => handleClick(id)}
      selected={selected || false}
    >
      <ListItemAvatar>
        {image ? <PlaylistAvatar src={image} alt={name} /> : "No image"}
      </ListItemAvatar>
      <ListItemText
        primary={<PlaylistName>{name}</PlaylistName>}
        secondary={
          <Typography variant="body1" color="text.secondary">
            {artistName}
          </Typography>
        }
      />
    </PlayListItemContainer>
  );
};

export default PlaylistItem;
