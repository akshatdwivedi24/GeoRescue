import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  IconButton,
  Grid,
  Link,
} from '@mui/material';
import {
  Instagram as InstagramIcon,
  GitHub as GitHubIcon,
  Email as EmailIcon,
  LinkedIn as LinkedInIcon,
  Close as CloseIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';

const authorData = {
  'Akshat Dwivedi': {
    bio: `Akshat Dwivedi is a passionate software developer with expertise in Spring Boot, Java, Docker, and Software Testing. He enjoys building robust and scalable applications while continuously exploring new technologies to enhance his skills.

Beyond the world of coding, Akshat is a Cricket Enthusiast, Music Aficionado, Movie Buff, and outdoor explorer. He enjoys long walks, finding inspiration in the rhythm of the world around him. With a blend of technical expertise and creativity, he is always eager to innovate and bring ideas to life. ❤`,
    socials: {
      instagram: 'https://www.instagram.com/aksh.at_24?utm_source=qr&igsh=ZmZzajVlYndkbnkz',
      github: 'https://github.com/akshatdwivedi24',
      email: 'akshatdwivedi2000@gmail.com',
      linkedin: 'https://www.linkedin.com/in/akshat-dwivedi1/'
    }
  },
  'Swastik Jangir': {
    bio: `Swastik Jangir – A results-driven Java, React.js, MySQL, and Testing specialist with a passion for building scalable, high-performance applications. Experienced in both frontend and backend development, ensuring seamless user experiences and robust architectures. Always eager to learn, innovate, and optimize solutions, adapting to new challenges with a problem-solving mindset.`,
    socials: {
      instagram: 'https://www.instagram.com/swastik_jangir?igsh=ZG5udGR2eWxicjVj',
      github: 'https://github.com/Swastikjangir',
      email: 'jangirswastik@gmail.com',
      linkedin: 'https://linkedin.com/in/swastik-jangir'
    }
  },
  'Magar Suyog Haribhau': {
    bio: `Suyog Magar is a tech enthusiast who loves solving problems and building cool things. Always eager to learn and explore new ideas, he enjoys making software that's efficient and impactful.`,
    socials: {
      instagram: 'https://www.instagram.com/suyog__magar?igsh=MXhyZXJsdDN5NjZ5eg==',
      github: 'https://github.com/SuyogMagar',
      email: 'hkmagar11@gmail.com'
    }
  }
};

const AuthorBioDialog = ({ open, handleClose, author }) => {
  const authorInfo = authorData[author];

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {author}
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Typography paragraph style={{ whiteSpace: 'pre-line' }}>
          {authorInfo.bio}
        </Typography>
        {authorInfo.socials && Object.keys(authorInfo.socials).length > 0 && (
          <Box mt={2}>
            <Typography variant="h6" gutterBottom>
              Connect with {author.split(' ')[0]}
            </Typography>
            <Grid container spacing={2}>
              {authorInfo.socials.instagram && (
                <Grid item>
                  <Link href={authorInfo.socials.instagram} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="contained"
                      startIcon={<InstagramIcon />}
                      sx={{
                        backgroundColor: '#E4405F',
                        '&:hover': {
                          backgroundColor: '#C13584',
                        },
                      }}
                    >
                      Instagram
                    </Button>
                  </Link>
                </Grid>
              )}
              {authorInfo.socials.github && (
                <Grid item>
                  <Link href={authorInfo.socials.github} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="contained"
                      startIcon={<GitHubIcon />}
                      sx={{
                        backgroundColor: '#333333',
                        '&:hover': {
                          backgroundColor: '#24292e',
                        },
                      }}
                    >
                      GitHub
                    </Button>
                  </Link>
                </Grid>
              )}
              {authorInfo.socials.email && (
                <Grid item>
                  <Link href={`mailto:${authorInfo.socials.email}`}>
                    <Button
                      variant="contained"
                      startIcon={<EmailIcon />}
                      sx={{
                        backgroundColor: '#EA4335',
                        '&:hover': {
                          backgroundColor: '#D93025',
                        },
                      }}
                    >
                      Email
                    </Button>
                  </Link>
                </Grid>
              )}
              {authorInfo.socials.linkedin && (
                <Grid item>
                  <Link href={authorInfo.socials.linkedin} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="contained"
                      startIcon={<LinkedInIcon />}
                      sx={{
                        backgroundColor: '#0077B5',
                        '&:hover': {
                          backgroundColor: '#006097',
                        },
                      }}
                    >
                      LinkedIn
                    </Button>
                  </Link>
                </Grid>
              )}
            </Grid>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

const AboutAuthor = () => {
  const [mainDialogOpen, setMainDialogOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const handleMainDialogOpen = () => {
    setMainDialogOpen(true);
  };

  const handleMainDialogClose = () => {
    setMainDialogOpen(false);
  };

  const handleAuthorClick = (author) => {
    setSelectedAuthor(author);
  };

  const handleAuthorDialogClose = () => {
    setSelectedAuthor(null);
  };

  return (
    <>
      <Button
        color="inherit"
        onClick={handleMainDialogOpen}
        sx={{ my: 2 }}
      >
        About the Authors
      </Button>

      {/* Main Authors Dialog */}
      <Dialog 
        open={mainDialogOpen} 
        onClose={handleMainDialogClose}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              About the Authors
            </Typography>
            <IconButton onClick={handleMainDialogClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container direction="column" spacing={2}>
            {Object.keys(authorData).map((author) => (
              <Grid item key={author}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleAuthorClick(author)}
                  sx={{
                    py: 2.5,
                    px: 3,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    background: '#ffffff',
                    color: '#2d3436',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e0e0e0',
                    '&:hover': {
                      background: '#f8f9fa',
                      boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)',
                      transform: 'translateY(-2px)',
                      border: '1px solid #bdbdbd',
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    borderRadius: '16px',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '4px',
                      background: 'linear-gradient(90deg, #00b894, #00cec9)',
                      transform: 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 0.3s ease',
                    },
                    '&:hover::after': {
                      transform: 'scaleX(1)',
                    },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #00b894, #00cec9)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                      }}
                    >
                      {author.charAt(0)}
                    </Box>
                    <Typography
                      sx={{
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: '#2d3436',
                      }}
                    >
                      {author}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: '#636e72',
                      fontSize: '0.9rem',
                    }}
                  >
                    View Profile →
                  </Typography>
                </Button>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>

      {/* Author Bio Dialog */}
      {selectedAuthor && (
        <Dialog 
          open={Boolean(selectedAuthor)} 
          onClose={handleAuthorDialogClose}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <Box display="flex" alignItems="center" gap={2}>
              <IconButton 
                onClick={handleAuthorDialogClose}
                sx={{ 
                  color: '#2d3436',
                  '&:hover': {
                    backgroundColor: 'rgba(45, 52, 54, 0.04)',
                  }
                }}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {selectedAuthor}
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent dividers>
            <Typography paragraph style={{ whiteSpace: 'pre-line' }}>
              {authorData[selectedAuthor].bio}
            </Typography>
            {authorData[selectedAuthor].socials && Object.keys(authorData[selectedAuthor].socials).length > 0 && (
              <Box mt={2}>
                <Typography variant="h6" gutterBottom>
                  Connect with {selectedAuthor.split(' ')[0]}
                </Typography>
                <Grid container spacing={2}>
                  {authorData[selectedAuthor].socials.instagram && (
                    <Grid item>
                      <Link href={authorData[selectedAuthor].socials.instagram} target="_blank" rel="noopener noreferrer">
                        <Button
                          variant="contained"
                          startIcon={<InstagramIcon />}
                          sx={{
                            backgroundColor: '#E4405F',
                            '&:hover': {
                              backgroundColor: '#C13584',
                            },
                          }}
                        >
                          Instagram
                        </Button>
                      </Link>
                    </Grid>
                  )}
                  {authorData[selectedAuthor].socials.github && (
                    <Grid item>
                      <Link href={authorData[selectedAuthor].socials.github} target="_blank" rel="noopener noreferrer">
                        <Button
                          variant="contained"
                          startIcon={<GitHubIcon />}
                          sx={{
                            backgroundColor: '#333333',
                            '&:hover': {
                              backgroundColor: '#24292e',
                            },
                          }}
                        >
                          GitHub
                        </Button>
                      </Link>
                    </Grid>
                  )}
                  {authorData[selectedAuthor].socials.email && (
                    <Grid item>
                      <Link href={`mailto:${authorData[selectedAuthor].socials.email}`}>
                        <Button
                          variant="contained"
                          startIcon={<EmailIcon />}
                          sx={{
                            backgroundColor: '#EA4335',
                            '&:hover': {
                              backgroundColor: '#D93025',
                            },
                          }}
                        >
                          Email
                        </Button>
                      </Link>
                    </Grid>
                  )}
                  {authorData[selectedAuthor].socials.linkedin && (
                    <Grid item>
                      <Link href={authorData[selectedAuthor].socials.linkedin} target="_blank" rel="noopener noreferrer">
                        <Button
                          variant="contained"
                          startIcon={<LinkedInIcon />}
                          sx={{
                            backgroundColor: '#0077B5',
                            '&:hover': {
                              backgroundColor: '#006097',
                            },
                          }}
                        >
                          LinkedIn
                        </Button>
                      </Link>
                    </Grid>
                  )}
                </Grid>
              </Box>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default AboutAuthor; 