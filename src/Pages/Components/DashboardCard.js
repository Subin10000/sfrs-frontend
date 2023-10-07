import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoneyIcon from '@mui/icons-material/Money';
import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import Groups3Icon from '@mui/icons-material/Groups3';

const DashboardCard = ({title, value, descriptionValue, description}) => {
    return(
        <Card sx={{width:"100%%", margin:"10px"}}>
            <CardContent>
                <Grid
                    container
                    spacing={3}
                    sx={{ justifyContent: 'space-between' }}
                >
                    <Grid item>
                        <Typography
                            color="textSecondary"
                            gutterBottom
                            variant="overline"
                        >
                        {title}
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="h6"
                        >
                            {value}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar
                            sx={{
                                backgroundColor: 'success.main',
                                height: 40,
                                width: 40
                            }}
                        >
                            <Groups3Icon />
                        </Avatar>
                    </Grid>
                </Grid>
             
            </CardContent>
        </Card>
    )
}

export default DashboardCard;
