import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface MagicLinkProps {
  magicLinkUrl: string;
  userName?: string;
}

export function MagicLinkTemplate({
  magicLinkUrl,
  userName = "utilisateur",
}: MagicLinkProps) {
  return (
    <Html>
      <Head />
      <Preview>Votre lien de connexion FamilyCook</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Text style={heading}>Connexion sans mot de passe 🔗</Text>
            <Text style={paragraph}>
              Bonjour {userName},
            </Text>
            <Text style={paragraph}>
              Cliquez sur le bouton ci-dessous pour vous connecter à FamilyCook.
              Ce lien n'est valable que 15 minutes.
            </Text>
            <Section style={buttonContainer}>
              <Button style={button} href={magicLinkUrl}>
                Me connecter
              </Button>
            </Section>
            <Text style={paragraph}>
              Ou copiez et collez ce lien :
            </Text>
            <Link href={magicLinkUrl} style={link}>
              {magicLinkUrl}
            </Link>
            <Text style={paragraph}>
              Si vous n'avez pas demandé ce lien, ignorez cet email.
            </Text>
            <Text style={footer}>
              Bienvenue sur FamilyCook ! 🍽️
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f9fafb",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#1f2937",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#374151",
  marginTop: "16px",
  marginBottom: "16px",
};

const buttonContainer = {
  padding: "27px 0 27px",
};

const button = {
  backgroundColor: "#000",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "11px 23px",
};

const link = {
  color: "#2563eb",
  textDecoration: "underline",
};

const footer = {
  color: "#666666",
  fontSize: "12px",
  fontWeight: "500",
  lineHeight: "24px",
  marginTop: "32px",
};
