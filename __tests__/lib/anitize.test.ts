// Test for the sanitize function
import { sanitize } from "../../lib/sanitize";

describe("sanitize", () => {
  it("should remove script tags from the input string", () => {
    const input = '<div>Hello World<script>alert("XSS")</script></div>';
    const expectedOutput = "<div>Hello World</div>";
    expect(sanitize(input)).toBe(expectedOutput);
  });

  it("should remove event handler attributes from the input string", () => {
    const input = "<button onclick=\"alert('XSS')\">Click me</button>";
    const expectedOutput = "<button>Click me</button>";
    expect(sanitize(input)).toBe(expectedOutput);
  });
  it("should handle nested malicious content", () => {
    const input = '<div><script>alert("XSS")</script><p onclick="stealCookies()">Text</p></div>';
    const expectedOutput = "<div><p>Text</p></div>";
    expect(sanitize(input)).toBe(expectedOutput);
  });

  it("should return the same string if there is no malicious content", () => {
    const input = "<div><p>Safe Content</p></div>";
    const expectedOutput = "<div><p>Safe Content</p></div>";
    expect(sanitize(input)).toBe(expectedOutput);
  });
  it("should handle empty strings", () => {
    const input = "";
    const expectedOutput = "";
    expect(sanitize(input)).toBe(expectedOutput);
  });

  it("should handle strings with only malicious content", () => {
    const input = '<script>alert("XSS")</script>';
    const expectedOutput = "";
    expect(sanitize(input)).toBe(expectedOutput);
  });

  it("should handle complex HTML structures with mixed content", () => {
    const input = `
      <div>
        <h1 onclick="hack()">Welcome</h1>
      </div>
    `;
    const result = sanitize(input);
    expect(result).not.toContain("onclick");
    expect(result).toContain("Welcome");
  });
});
