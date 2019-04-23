using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Backend.Lib;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace Backend.Hubs
{
    [Authorize]
    public class ChatHub : Hub
    {
        public readonly static ConnectionMapping<int> _connections = new ConnectionMapping<int>();

        public Task Send(MessageDetails details)
        {
            details.Sender = this.GetUserId();
            foreach (var connectionId in _connections.GetConnections(details.Reciver))
            {
                return Clients.Client(connectionId).SendAsync("send", details);
            }
            
            return Clients.Caller.SendAsync("send", "ERROR");
        }

        public override Task OnConnectedAsync()
        {
            _connections.Add( GetUserId(), Context.ConnectionId );
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception e)
        {
            _connections.Remove(GetUserId(), Context.ConnectionId);
            return base.OnDisconnectedAsync(e);
        }

        private int GetUserId()
        {
            UserClaimsReader reader = new UserClaimsReader(Context.User);
            return int.Parse( reader.Get(ClaimTypes.NameIdentifier) );
        }
    }
}