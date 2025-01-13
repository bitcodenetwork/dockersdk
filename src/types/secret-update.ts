type DockerSecretUpdateQuery = {
  version: string;
}

type DockerSecretUpdateBody = {
  Name: string
  Labels: {
    [key: string]: string
  }
  Data: string
  Driver: {
    Name: string
    Options?: {
      [key: string]: string
    }
  }
  Templating: {
    Name: string
    Options?: {
      [key: string]: string
    }
  }
}
