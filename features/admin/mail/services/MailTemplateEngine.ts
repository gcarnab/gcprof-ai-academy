export class MailTemplateEngine {
  private variables: Record<string, string>;

  constructor(variables: Record<string, string>) {
    this.variables = variables;
  }

  render(input: string): string {
    if (!input) return "";

    let output = input;

    for (const [key, value] of Object.entries(this.variables)) {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
      output = output.replace(regex, value ?? "");
    }

    return output;
  }
}
