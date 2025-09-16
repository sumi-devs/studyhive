from transformers import pipeline
import torch

# Load summarizer model
summarizer = pipeline("summarization", model="facebook/bart-large-cnn", device=0)

# Function to break text into smaller chunks
def chunk_text(text, max_words=300):
    words = text.split()
    for i in range(0, len(words), max_words):
        yield " ".join(words[i:i + max_words])

# Your article text
ARTICLE = """ 1.3.1 Packet Switching
In a network application, end systems exchange messages with each other. Mes-
sages can contain anything the application designer wants. Messages may perform
a control function (for example, the “Hi” messages in our handshaking example in
Figure 1.2) or can contain data, such as an e-mail message, a JPEG image, or an
MP3 audio file. To send a message from a source end system to a destination end
system, the source breaks long messages into smaller chunks of data known as pack-
ets. Between source and destination, each packet travels through communication
links and packet switches (for which there are two predominant types, routers and
link-layer switches). Packets are transmitted over each communication link at a rate
equal to the full transmission rate of the link. So, if a source end system or a packet
switch is sending a packet of L bits over a link with transmission rate R bits/sec, then
the time to transmit the packet is L / R seconds.
Store-and-Forward Transmission
Most packet switches use store-and-forward transmission at the inputs to the
links. Store-and-forward transmission means that the packet switch must receive
the entire packet before it can begin to transmit the first bit of the packet onto the
outbound link. To explore store-and-forward transmission in more detail, consider
a simple network consisting of two end systems connected by a single router, as
shown in Figure 1.11. A router will typically have many incident links, since its job is to switch an incoming packet onto an outgoing link; in this simple example,
the router has the rather simple task of transferring a packet from one (input) link
to the only other attached link. In this example, the source has three packets, each
consisting of L bits, to send to the destination. At the snapshot of time shown in
Figure 1.11, the source has transmitted some of packet 1, and the front of packet 1
has already arrived at the router. Because the router employs store-and-forwarding,
at this instant of time, the router cannot transmit the bits it has received; instead it
must first buffer (i.e., “store”) the packet’s bits. Only after the router has received
all of the packet’s bits can it begin to transmit (i.e., “forward”) the packet onto the
outbound link. To gain some insight into store-and-forward transmission, let’s now
calculate the amount of time that elapses from when the source begins to send the
packet until the destination has received the entire packet. (Here we will ignore
propagation delay—the time it takes for the bits to travel across the wire at near
the speed of light—which will be discussed in Section 1.4.) The source begins to
transmit at time 0; at time L/R seconds, the source has transmitted the entire packet,
and the entire packet has been received and stored at the router (since there is no
propagation delay). At time L/R seconds, since the router has just received the entire
packet, it can begin to transmit the packet onto the outbound link towards the des-
tination; at time 2L/R, the router has transmitted the entire packet, and the entire
packet has been received by the destination. Thus, the total delay is 2L/R. If the switch instead forwarded bits as soon as they arrive (without first receiving the entire
packet), then the total delay would be L/R since bits are not held up at the router.
But, as we will discuss in Section 1.4, routers need to receive, store, and process the
entire packet before forwarding.
Now let’s calculate the amount of time that elapses from when the source begins
to send the first packet until the destination has received all three packets. As before,
at time L/R, the router begins to forward the first packet. But also at time L/R the
source will begin to send the second packet, since it has just finished sending the
entire first packet. Thus, at time 2L/R, the destination has received the first packet
and the router has received the second packet. Similarly, at time 3L/R, the destina-
tion has received the first two packets and the router has received the third packet.
Finally, at time 4L/R the destination has received all three packets.
"""

# Step 1: Summarize chunks
chunk_summaries = []
for i, chunk in enumerate(chunk_text(ARTICLE, max_words=300)):
    summary = summarizer(chunk, max_length=130, min_length=30, do_sample=False)
    summary_text = summary[0]['summary_text']
    chunk_summaries.append(summary_text)
    print(f"\n{summary_text}")

# Debug info about device
print("\nCUDA available:", torch.cuda.is_available())
print("CUDA version:", torch.version.cuda)
print("Device index:", summarizer.device)
if torch.cuda.is_available():
    print("Device name:", torch.cuda.get_device_name(0))
