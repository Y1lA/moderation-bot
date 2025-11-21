import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const config: BotConfig = {
    token: 'MTQzODk2MTczNTY2NTk3NTQxNw.GaQaRt.-gF1s_ImmabnkOy4HjKkBLsswIdjdR_QQcpBDQ',                   // token
    clientId: '1438961735665975417',                  // client id
    mongoUri: 'mongodb+srv://vsohaib:Saud1234@system.v8os2nj.mongodb.net/?appName=System',           // mongo uri
    defaultPrefix: '!',
    mainGuildId: '1413119597623644222',             // main guild id
    defaultLanguage: 'en',        // default language
    dashboard: {
        port: 3000,             // port for dashboard
        secret: 'wickstudio',  // secret key
        callbackUrl: 'http://localhost:3000/auth/callback' // callback url
    }
};


export interface BotConfig {
    token: string;
    clientId: string;
    mongoUri: string;
    defaultPrefix: string;
    mainGuildId: string;
    defaultLanguage: string;
    dashboard: {
        port: number;
        secret: string;
        callbackUrl: string;
    };
}

function loadSettingsFile(): any {
    let settingsPath = join(__dirname, 'settings.json');
    
    if (!existsSync(settingsPath)) {
        settingsPath = join(__dirname, '../settings.json');
        
        if (!existsSync(settingsPath)) {
            settingsPath = join(process.cwd(), 'settings.json');
            
            if (!existsSync(settingsPath)) {
                const defaultSettings = {
                    defaultLanguage: "en",
                    logs: {},
                    protection: {
                        enabled: true,
                        modules: {}
                    }
                };
                
                writeFileSync(settingsPath, JSON.stringify(defaultSettings, null, 4), 'utf8');
                console.log(`Created default settings file at ${settingsPath}`);
                return defaultSettings;
            }
        }
    }
    
    try {
        console.log(`Loading settings from: ${settingsPath}`);
        const settings = JSON.parse(readFileSync(settingsPath, 'utf-8'));
        return settings;
    } catch (error) {
        console.error(`Error reading settings file: ${error}`);
        throw new Error('Failed to load settings.json file');
    }
}
const settings = loadSettingsFile();

export default {
    ...config,
    ...settings,
    token: config.token,
    clientId: config.clientId,
    mongoUri: config.mongoUri,
    defaultPrefix: config.defaultPrefix,
    mainGuildId: config.mainGuildId,
    dashboard: config.dashboard
}; 
