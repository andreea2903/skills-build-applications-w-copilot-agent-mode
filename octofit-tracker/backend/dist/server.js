"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = exports.app = void 0;
require("./config/database");
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
exports.app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
exports.app.use(express_1.default.json());
exports.app.use('/api/users', users_1.default);
exports.app.use('/api/teams', teams_1.default);
exports.app.use('/api/activities', activities_1.default);
exports.app.use('/api/leaderboard', leaderboard_1.default);
exports.app.use('/api/workouts', workouts_1.default);
exports.app.get('/api/config', (_req, res) => {
    const apiHost = codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : `http://localhost:${port}`;
    res.json({
        apiUrl: apiHost,
        port,
        codespaceName: codespaceName || null
    });
});
const startServer = () => {
    return exports.app.listen(port, () => {
        console.log(`OctoFit Tracker API listening on port ${port}`);
        if (codespaceName) {
            console.log(`Codespace API endpoint: https://${codespaceName}-8000.app.github.dev`);
        }
    });
};
exports.startServer = startServer;
if (process.env.NODE_ENV !== 'test') {
    (0, exports.startServer)();
}
exports.default = exports.app;
