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

interface ResetPasswordProps {
  resetUrl: string;
  userName?: string;
}

export function ResetPasswordTemplate({
  resetUrl,
  userName = "utilisateur",
}: ResetPasswordProps) {
  return (
    <Html>
      <Head />
      <Preview>Réinitialiser votre mot de passe FamilyCook</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Text style={heading}>Réinitialiser votre mot de passe 🔐</Text>
            <Text style={paragraph}>
              Bonjour {userName},
            </Text>
            <Text style={paragraph}>
              Nous avons reçu une demande de réinitialisation de mot de passe
              pour votre compte FamilyCook. Cliquez sur le bouton ci-dessous
              pour créer un nouveau mot de passe.
            </Text>
            <Section style={buttonContainer}>
              <Button style={button} href={resetUrl}>
                Réinitialiser mon mot de passe
              </Button>
            </Section>
            <Text style={paragraph}>
              Ou copiez et collez ce lien :
            </Text>
            <Link href={resetUrl} style={link}>
              {resetUrl}
            </Link>
            <Text style={paragraph}>
              Ce lien expirera dans 1 heure.
            </Text>
            <Text style={paragraph}>
              Si vous n'avez pas demandé cette réinitialisation, veuillez
              ignorer cet email ou contacter le support.
            </Text>
            <Text style={footer}>
              À bientôt sur FamilyCook ! 🍽️
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
