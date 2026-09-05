import { AIProvider, AIResponse, ConversationContext } from './AIProvider';
import { CommandParser } from '../assistant/commandParser';

export class DemoAIProvider implements AIProvider {
  public readonly name = 'Demo/Simulated JARVIS Core';
  private parser = new CommandParser();

  public async generateResponse(prompt: string, context: ConversationContext): Promise<AIResponse> {
    const trimmed = prompt.trim();
    const lower = trimmed.toLowerCase();
    const command = this.parser.parse(trimmed);

    // Artificial short latency to simulate JARVIS neural network computation
    await new Promise((resolve) => setTimeout(resolve, 350));

    let responseText = '';

    if (command) {
      switch (command.type) {
        case 'OPEN_WEBSITE':
          responseText = `Right away, sir. Opening ${command.target} in a secure uplink tab.`;
          break;
        case 'GET_TIME': {
          const now = new Date();
          const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
          const dateString = now.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
          responseText = `The current time is ${timeString}, ${dateString}. Chronometers calibrated to local time standard.`;
          break;
        }
        case 'GET_WEATHER': {
          const city = command.payload?.city || 'Malibu';
          responseText = `Atmospheric scans for ${city}: Temperature 24°C, humidity at 48%, wind speeds nominal at 11 km/h. Clear skies for flight protocols.`;
          break;
        }
        case 'GET_SYSTEM_STATUS': {
          const cpu = context.systemStats?.cpuUsage ?? 34;
          const ram = context.systemStats?.ramUsage ?? 58;
          const battery = context.suitTelemetry?.battery ?? 89;
          const core = context.suitTelemetry?.corePower ?? 97;
          responseText = `Suit diagnostics nominal, sir. Main CPU load is at ${cpu}%, RAM utilization is ${ram}%. Arc Reactor core is outputting at ${core}% with backup battery at ${battery}%. All subsystems operational.`;
          break;
        }
        case 'TOGGLE_REACTOR':
          responseText = `Arc Reactor energy manifold engaged. Plasma containment field oscillating at peak resonant harmonic frequency.`;
          break;
        case 'SWITCH_HUD_MODE': {
          const mode = command.payload?.mode === 'helmet' ? 'tactical helmet view' : 'standard command deck';
          responseText = `Reconfiguring primary HUD projection to ${mode}. Heads-up displays aligned.`;
          break;
        }
        case 'TOGGLE_VOICE':
          responseText = `Audio feedback protocols updated, sir. Speech synthesis status toggled.`;
          break;
        case 'LAUNCH_APP':
          responseText = `Executing safe application shortcut for ${command.target}. Sandboxed process spawned.`;
          break;
        default:
          responseText = `Command verified and queued for execution: ${command.type}.`;
      }

      return {
        text: responseText,
        commandDetected: command,
        confidence: command.confidence,
        provider: this.name
      };
    }

    // Conversational & Lore responses
    if (/(?:who are you|what are you|introduce yourself)/i.test(lower)) {
      responseText = `I am J.A.R.V.I.S. — Just A Rather Very Intelligent System. I oversee the Mark LXXXV armor telemetry, system diagnostics, and tactical HUD computation. How may I be of service, sir?`;
    } else if (/(?:hello|hi|hey|greetings|good morning|good evening)/i.test(lower)) {
      responseText = `Greetings, sir. All suit systems are running at nominal tolerances. What are your orders?`;
    } else if (/(?:how are you|status|check in)/i.test(lower)) {
      responseText = `Operating at 100% computational efficiency, sir. Neural coprocessors are fully synchronized with your HUD.`;
    } else if (/(?:tony|stark|avengers|iron man)/i.test(lower)) {
      responseText = `Stark Industries firmware version 85.4.1 is active. Mark LXXXV armor remains in prime combat and flight readiness.`;
    } else if (/(?:flight|fly|thruster)/i.test(lower)) {
      responseText = `Repulsor repelling coils are primed. Flight stabilization gyroscopes report zero drift. Ready for vector calculation.`;
    } else if (/(?:help|what can you do|commands)/i.test(lower)) {
      responseText = `You can issue voice or text commands such as: "Open YouTube", "System status", "Check weather in Tokyo", "What time is it?", "Enter helmet mode", or ask me any diagnostic query.`;
    } else {
      const genericResponses = [
        `Analysis complete, sir. Telemetry remains steady and all defense barriers are active.`,
        `Understood, sir. I've logged the query and synchronized the tactical registers.`,
        `Telemetry confirmed. Is there a specific protocol or telemetry sector you would like me to inspect?`,
        `At your service, sir. The suit core and avionics continue running without anomalous divergence.`
      ];
      responseText = genericResponses[Math.floor(Math.random() * genericResponses.length)];
    }

    return {
      text: responseText,
      confidence: 0.88,
      provider: this.name
    };
  }
}
